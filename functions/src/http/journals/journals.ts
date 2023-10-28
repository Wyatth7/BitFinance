import { onRequest } from "firebase-functions/v2/https";
import { verifyToken } from "../../shared/helpers/auth/verify-token";
import { badRequestResponse, okResponse, unauthorizedResponse } from "../../shared/responses/responses";
import * as logger from 'firebase-functions/logger';
import * as admin from 'firebase-admin';
import { FirestoreCollections } from "../../shared/enums/firestore-collections";
import { JournalEntry } from "../../shared/models/journals/journal-entry";
import { EntryListResponseDto } from "../../shared/models/journals/dto/entry-list-response-dto";
import { JournalApprovalType } from "../../shared/models/enums/journal-approval-type";
import { JournalEntryDto } from "../../shared/models/journals/dto/journal-entry-dto";
import { EntryCalculations } from "../../shared/helpers/calculations/entry-calculations";
import { AccountModel } from "../../shared/models/accounts/account-model";
import { AccountEntryDto } from "../../shared/models/journals/dto/account-entry-dto";
import { EntryListItemResponseDto } from "../../shared/models/journals/dto/entry-list-item-reponse-dto";

export const getJournalList = onRequest(
    {cors: true},
    async (req, res) => {
        if (!await verifyToken(req)) {
            return unauthorizedResponse(res);
        }

        try {
            
            const entriesSnapshot = await admin.firestore()
                .collection(FirestoreCollections.journals)
                .get();

            if (entriesSnapshot.empty) return okResponse([], 200, res);

            const entries = entriesSnapshot.docs.map(entry => entry.data() as JournalEntry);

            const entriesResponse = createEntryListResponse(entries);

            return okResponse(entriesResponse, 200, res);

        } catch (error) {
            logger.error(error);
            return badRequestResponse('Could not get journal entires.', res);
        }
    }
);

export const getJournalEntry = onRequest(
    {cors: true},
    async (req, res) => {
        if (!await verifyToken(req)) {
            return unauthorizedResponse(res);
        }

        const journalId: string = req.body.data;

        try {

            // get journal
            const entrySnapshot = await admin.firestore()
                .collection(FirestoreCollections.journals)
                .doc(journalId)
                .get();

            if (!entrySnapshot.exists) {
                return badRequestResponse('The journal entry requested does not exist.', res);
            }

            const entry = entrySnapshot.data() as JournalEntry;

            // get accounts associated with entry
            const accountSnapshot = await admin.firestore()
                .collection(FirestoreCollections.accounts)
                .where('accountId', 'in', entry.accounts)
                .get();

            if (accountSnapshot.empty) {
                return badRequestResponse('Accounts could not be found for the entry.', res);
            }

            const accounts = accountSnapshot.docs.map(account => account.data() as AccountModel);

            const accountEntries: AccountEntryDto[] = [];

            // create account entries
            // loop over each account ID 
            for (const accountId of entry.accounts) {
                // get transactions by account ID
                const transactions = entry.transactions
                    .filter(transaction => transaction.accountId === accountId);

                // sum totals for the account
                const accountLevelAmount = EntryCalculations.calculateEntryTotals(transactions);

                // create/add the account entry
                const accountName = accounts.find(account => account.accountId === accountId)!.accountName;

                const accountEntry: AccountEntryDto = {
                    accountId,
                    accountName,
                    totalCredits: accountLevelAmount.credit,
                    totalDebits: accountLevelAmount.debit,
                    balance: accountLevelAmount.balance
                }

                accountEntries.push(accountEntry);
            }

            const transactionTotals = EntryCalculations.calculateEntryTotals(entry.transactions);

            const entryDto: JournalEntryDto = {
                journalId: entry.journalId,
                entryName: entry.entryName,
                description: entry.entryDescription,
                totalCredits: transactionTotals.credit,
                totalDebits: transactionTotals.debit,
                files: entry.fileData,
                accountEntries,
                createdOn: entry.creationDate,
                approvalType: entry.approvalType,
                declineComment: entry.declineComment
            }

            return okResponse(entryDto, 200, res);
            
        } catch (error) {
            logger.error(error);
            return okResponse('Could not get journal', 200, res);
        }
    }
);

const createEntryListResponse = (entries: JournalEntry[]): EntryListResponseDto => {
    const entriesResponse: EntryListResponseDto = {
        approved: [],
        requested: [],
        declined: []
    }

    entries.forEach(entry => {

        const amounts = EntryCalculations.calculateEntryTotals(entry.transactions);

        const dto: EntryListItemResponseDto = {
            journalId: entry.journalId,
            entryName: entry.entryName,
            entryDescription: entry.entryDescription,
            approvalType: entry.approvalType,
            creationDate: entry.creationDate,
            totalCredit: amounts.credit,
            totalDebit: amounts.debit,
            balance: amounts.balance
        }

        switch(entry.approvalType) {
            case JournalApprovalType.approved:
                entriesResponse.approved.push(dto);
                break;
            case JournalApprovalType.requested:
                    entriesResponse.requested.push(dto);
                    break;
            case JournalApprovalType.declined:
                entriesResponse.declined.push(dto);
                break;
            default: break;
        }
    });

    return entriesResponse;
}