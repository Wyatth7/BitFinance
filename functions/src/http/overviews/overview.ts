import { onRequest } from "firebase-functions/v2/https";
import * as logger from 'firebase-functions/logger';
import { badRequestResponse, okResponse } from "../../shared/responses/responses";
import * as admin from "firebase-admin";
import { FirestoreCollections } from "../../shared/enums/firestore-collections";
import { OverviewModel } from "../../shared/models/overview/overview-model";
import { JournalApprovalType } from "../../shared/models/enums/journal-approval-type";

export const getOverview = onRequest(
    {cors: true},
    async (req, res) => {
        try {
            
            const usersSnapshot = await admin.firestore().collection(FirestoreCollections.users.toString())
                .where('requested', '==', false)
                .count().get();

            const requestedSnapshot = await admin.firestore().collection(FirestoreCollections.users.toString())
                .where('requested', '==', true)
                .count().get();

            const accountsSnapshot = await admin.firestore().collection(FirestoreCollections.accounts)
                .count().get();
            
            const requestedJournalSnapshot = await admin.firestore().collection(FirestoreCollections.journals.toString())
                .where('approvalType', '==', JournalApprovalType.requested)
                .count().get();

            const approvedJournalSnapshot = await admin.firestore().collection(FirestoreCollections.journals.toString())
                .where('approvalType', '==', JournalApprovalType.approved)
                .count().get();
            
            const declinedJournalSnapshot = await admin.firestore().collection(FirestoreCollections.journals.toString())
                .where('approvalType', '==', JournalApprovalType.declined)
                .count().get();


            const overviewData: OverviewModel = {
                users: {
                    requested: requestedSnapshot.data().count,
                    accepted: usersSnapshot.data().count,
                },
                journals: {
                    requested: requestedJournalSnapshot.data().count,
                    approved: approvedJournalSnapshot.data().count,
                    declined: declinedJournalSnapshot.data().count,
                },
                accounts: accountsSnapshot.data().count
            }

            return okResponse(overviewData, 200, res);

        } catch (error) {
            logger.error(error);
            return badRequestResponse("Could not get user overview data.", res);
        }
    }
)