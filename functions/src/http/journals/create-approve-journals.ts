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
                    normalType: transaction.normalType
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

    const batch = admin.firestore().batch();

    journalEntry.accounts
        .forEach(accountId => {
            const guid = Guid.createGuid();
            batch.create(
                admin.firestore()
                    .collection(FirestoreCollections.accounts)
                    .doc(accountId)
                    .collection(FirebaseSubCollections.accountJournal)
                    .doc(guid),
            accountJournal
            );
    });

    await batch.commit();
    
}