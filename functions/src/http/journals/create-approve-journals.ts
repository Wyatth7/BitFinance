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

            await addJournalToAccounts(journal);
            
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
const addJournalToAccounts = async (journalEntry: JournalEntry) => {
    const amounts = {
        credit: 0,
        debit: 0,
        balance: 0
    };


    journalEntry.transactions.forEach(transaction => {
        if (transaction.normalType === NormalType.credit){
            amounts.credit += transaction.amount;
            amounts.balance -= transaction.amount

            return;
        }

        amounts.balance += transaction.amount;
        amounts.debit += transaction.amount;
    });

    const batch = admin.firestore().batch();

    // update balances for account
    await updateAccountBalances(journalEntry.transactions, journalEntry.accounts, batch);

    // Adds entry to accounts
    await updateAccounts(journalEntry, amounts, batch);

    await batch.commit();

}

/**
 * 
 * @param transactions Array of transactions in entry
 * @param batch firestore batch
 */
const updateAccountBalances = async (transactions: Transaction[], accounts: string[], batch: admin.firestore.WriteBatch) => {
    for (const accountId of accounts) {
        
        const accountRef = admin.firestore()
        .collection(FirestoreCollections.accounts)
        .doc(accountId);

        const accountSnapshot = await accountRef.get();

        if (!accountSnapshot.exists) throw new Error('Account does not exist.');

        const account = accountSnapshot.data() as AccountModel;

        // get transactions related to account
        const transactionsForAccount = transactions
            .filter(transaction => transaction.accountId === accountId)

        // sum all debits and credits
        const amounts = {
            debit: 0,
            credit: 0
        };

        transactionsForAccount.forEach(transaction => {
            if (transaction.normalType === NormalType.credit){
                amounts.credit += transaction.amount;
    
                return;
            }
    
            amounts.debit += transaction.amount;
        })

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
        batch.update(accountRef, {balance: account.balance})

    }
}

/**
 * Adds journal to accounts
 * @param journalEntry Journal entry 
 * @param amounts Total journal balance, debits and credits
 */
const updateAccounts = async (journalEntry: JournalEntry, amounts: {balance: number, debit: number, credit: number}, batch: admin.firestore.WriteBatch) => {
    // create account level journal data
    const accountJournal: AccountEntry = {
        journalId: journalEntry.journalId,
        entryName: journalEntry.entryName,
        description: journalEntry.entryDescription,
        balance: amounts.balance,
        debit: amounts.debit,
        credit: amounts.credit,
        creationDate: journalEntry.creationDate
    }
    
    // add journal to sub-collection
    for (const accountId of journalEntry.accounts) {
        // add entry to linked accounts
        const guid = Guid.createGuid();
        batch.create(
            admin.firestore()
                .collection(FirestoreCollections.accounts)
                .doc(accountId)
                .collection(FirebaseSubCollections.accountJournal)
                .doc(guid),
        accountJournal
        );
    }

}