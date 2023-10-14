import { onRequest } from "firebase-functions/v2/https";
import { verifyToken } from "../../shared/helpers/auth/verify-token";
import { badRequestResponse, okResponse, unauthorizedResponse } from "../../shared/responses/responses";
import * as logger from 'firebase-functions/logger';
import * as admin from 'firebase-admin';
import { FirestoreCollections } from "../../shared/enums/firestore-collections";
import { JournalEntry } from "../../shared/models/journals/journal-entry";
import { EntryListResponseDto } from "../../shared/models/journals/dto/entry-list-response-dto";
import { JournalApprovalType } from "../../shared/models/enums/journal-approval-type";

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


const createEntryListResponse = (entries: JournalEntry[]): EntryListResponseDto => {
    const entriesResponse: EntryListResponseDto = {
        approved: [],
        requested: [],
        declined: []
    }


    entries.forEach(entry => {
        switch(entry.approvalType) {
            case JournalApprovalType.approved:
                entriesResponse.approved.push(entry);
                break;
            case JournalApprovalType.requested:
                    entriesResponse.requested.push(entry);
                    break;
            case JournalApprovalType.declined:
                entriesResponse.declined.push(entry);
                break;
            default: break;
        }
    });

    return entriesResponse;
}