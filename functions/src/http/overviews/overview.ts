import { onRequest } from "firebase-functions/v2/https";
import * as logger from 'firebase-functions/logger';
import { badRequestResponse, okResponse } from "../../shared/responses/responses";
import * as admin from "firebase-admin";
import { FirestoreCollections } from "../../shared/enums/firestore-collections";
import { OverviewModel } from "../../shared/models/overview/overview-model";

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

            const overviewData: OverviewModel = {
                users: {
                    requested: requestedSnapshot.data().count,
                    accepted: usersSnapshot.data().count
                }
            }

            return okResponse(overviewData, 200, res);

        } catch (error) {
            logger.error(error);
            return badRequestResponse("Could not get user overview data.", res);
        }
    }
)