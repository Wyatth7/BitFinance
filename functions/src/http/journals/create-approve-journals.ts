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