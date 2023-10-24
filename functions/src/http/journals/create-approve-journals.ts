import { onRequest } from "firebase-functions/v2/https";
import { verifyToken } from "../../shared/helpers/auth/verify-token";
import { badRequestResponse, okResponse, unauthorizedResponse } from "../../shared/responses/responses";
import { CreateJournalEntryDto } from "../../shared/models/journals/dto/create-journal-entry-dto";
import * as logger from 'firebase-functions/logger';
import { Transaction } from "../../shared/models/journals/transaction";
import { JournalEntry } from "../../shared/models/journals/journal-entry";
import { Guid } from "../../shared/helpers/guids/generate-guid";
import { JournalApprovalType } from "../../shared/models/enums/journal-approval-type";
import * as admin from 'firebase-admin';
import { FirestoreCollections } from "../../shared/enums/firestore-collections";
import { EntryActionDto } from "../../shared/models/journals/dto/entry-action-dto";
import { AccountEntry } from "../../shared/models/journals/account-journal";
import { NormalType } from "../../shared/enums/accounts/normal-type";
import { FirebaseSubCollections } from "../../shared/enums/firestore-sub-collections";
import { AccountModel } from "../../shared/models/accounts/account-model";

export const createJournalEntry = onRequest(
    {cors: true},
    async (req, res) => {
        if (!await verifyToken(req)) {
            return unauthorizedResponse(res);
        }

        const dto = req.body.data as CreateJournalEntryDto;

        if (!dto) {
            return badRequestResponse('The journal entry data sent is invalid.', res);
        }

        try {
           
            const accounts = dto.transactions.map(transaction => transaction.accountId);
            const transactions: Transaction[] = dto.transactions.map(transaction => (
                {
                    amount: transaction.amount,
                    normalType: transaction.normalType,
                    accountId: transaction.accountId
                }
            ));
            
            const journal: JournalEntry = {
                journalId: Guid.createGuid(),
                accounts,
                transactions,
                entryName: dto.name,
                entryDescription: dto.description,
                creationDate: new Date().toISOString(),
                approvalType: JournalApprovalType.requested,
                attachedFileCount: dto.files?.length || 0,
                fileData: dto.files || []
            };
            
            await admin.firestore()
                .collection(FirestoreCollections.journals)
                .doc(journal.journalId)
                .set(journal);


            return okResponse({}, 200, res);

        } catch (error) {
            logger.error(error)
            return badRequestResponse('Could not create journal entry.', res);
        }
    }
);

export const approveRejectDeny = onRequest(
    {cors: true},
    async (req, res) => {
        if (!await verifyToken(req)) {
            return unauthorizedResponse(res);
        }

        const actionData = req.body.data as EntryActionDto;

        try {
            const journalRef = admin.firestore()
                .collection(FirestoreCollections.journals)
                .doc(actionData.journalId);

            if (!actionData.shouldAccept) {
                await journalRef.update({
                    approvalType: JournalApprovalType.declined
                });

                return okResponse({}, 200, res);
            }

            await journalRef.update({
                approvalType: JournalApprovalType.approved
            });

            const journal = (await journalRef.get()).data() as JournalEntry;

            await updateAccounts(journal);
            
            return okResponse({}, 200, res);
        } catch (error) {
            logger.error(error);
            return badRequestResponse('An error occurred and the entry could not be approved or declined.', res);
        }
    }
);

/**
 * Adds journal entry data to each account 
 * @param journalEntry Journal entry data 
 */
const updateAccounts = async (journalEntry: JournalEntry) => {
    const accountSnapshot = await admin.firestore()
        .collection(FirestoreCollections.accounts)
        .where('accountId', 'in', journalEntry.accounts)
        .get();

    if (accountSnapshot.empty) throw new Error('Account list empty.');

    const accounts = accountSnapshot.docs.map(account => account.data() as AccountModel);

    const batch = admin.firestore().batch();

    for (const account of accounts) {
        // get transactions related to account
        const transactionsForAccount = journalEntry.transactions
            .filter(transaction => transaction.accountId === account.accountId)
    
        // sum all debits and credits
        const amounts = getTransactionAmounts(transactionsForAccount);
        
        // update balances for account
        const newBalance = await calculateAccountBalance(account, amounts);
        const entryCount = account.entries + 1;

        batch.update(
            admin.firestore()
                .collection(FirestoreCollections.accounts)
                .doc(account.accountId),
            {balance: newBalance, entries: entryCount}
        )

        // create account level journal data
        const accountJournal: AccountEntry = {
            journalId: journalEntry.journalId,
            entryName: journalEntry.entryName,
            debit: amounts.debit,
            credit: amounts.credit,
            creationDate: journalEntry.creationDate
        }

        // add entry to account
        const guid = Guid.createGuid();
        batch.create(
            admin.firestore()
                .collection(FirestoreCollections.accounts)
                .doc(account.accountId)
                .collection(FirebaseSubCollections.accountJournal)
                .doc(guid),
        accountJournal
        );
    }

    await batch.commit();
}

/**
 * Calcuates the total of an account
 * @param account Account model
 * @param amounts credit and debit amounts
 * @returns balance of an account
 */
const calculateAccountBalance = async (
    account: AccountModel,
    amounts: {credit: number, debit: number}
    ): Promise<number> => {
        // if account normal side is debit, add debits, subtract credits from balance
        // else, subtract debits, add credits from balance
        if (account.normalType === NormalType.debit) {
            account.balance -= amounts.credit;
            account.balance += amounts.debit;
        } else {
            account.balance += amounts.credit;
            account.balance -= amounts.debit;
        }

        // update account balance
        return account.balance;
}

/**
 * Totals the credit and debit amounts of a list of transactions
 * @param transactions Array of transactions
 * @returns Amounts object
 */
const getTransactionAmounts = (transactions: Transaction[]) => {
    // sum all debits and credits
    const amounts = {
        debit: 0,
        credit: 0
    };

    transactions.forEach(transaction => {
        if (transaction.normalType === NormalType.credit){
            amounts.credit += transaction.amount;

            return;
        }

        amounts.debit += transaction.amount;
    });

    return amounts;
};