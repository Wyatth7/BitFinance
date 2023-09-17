import { onRequest } from "firebase-functions/v2/https"
import * as admin from 'firebase-admin';
import { UserModel } from "../../shared/models/users/user-model";
import { verifyToken } from "../../shared/helpers/auth/verify-token";
import { badRequestResponse, okResponse, unauthorizedResponse } from "../../shared/responses/responses";
import { FirestoreCollections } from "../../shared/enums/firestore-collections";
import { UserListModel } from "../../shared/models/users/user-list-model";
import { SuspendUserModel } from "../../shared/models/users/suspend-user-model";
import * as logger from "firebase-functions/logger";

export const getUser = onRequest(
    {cors: true},
    async (req, res) => {
        if (!await verifyToken(req)) {
            return unauthorizedResponse(res);
        }

        const userId = req.body.data as string;

        const snapshot = await admin.firestore().collection(FirestoreCollections.users.valueOf().toString())
            .where('uid', '==', userId).get();

        if (snapshot.empty) {
            return badRequestResponse("The user does not exist.", res)
        }

        let user: UserModel | null = null;
        
        snapshot.forEach(fetchedUser => {
            user = fetchedUser.data() as UserModel;
        });

        return okResponse(user, 200, res);
    }
)

export const getUsers = onRequest(
    {cors: true},
    async (req, res) => {
        if (!await verifyToken(req)) {
            return unauthorizedResponse(res);
        }

        const snapshot = await admin.firestore().collection(FirestoreCollections.users.valueOf().toString()).get();

        if (snapshot.empty) {
            return badRequestResponse("Users could not be fetched.", res);
        }

        let users: UserListModel = {acceptedUsers: [], requestedUsers: []};

        snapshot.forEach(data => {
            const user = data.data() as UserModel;

            if (user.requested){
                 users.requestedUsers.push(user)
                 return;
            }
            
            users.acceptedUsers.push(user)
        })

        return okResponse(users, 200, res);
    }
);

export const suspendUser = onRequest(
    {cors: true},
    async (req, res) => {
        if (!await verifyToken(req)) {
            return unauthorizedResponse(res);
        }

        const suspendModel = req.body.data as SuspendUserModel;

        try {
            await admin.firestore().collection(FirestoreCollections.users.toString())
                .doc(suspendModel.uid).update({
                    suspended: {
                        start: suspendModel.suspendDates.start,
                        end: suspendModel.suspendDates.end
                    }
                })

            return okResponse({}, 200, res);
        }catch(error) {
            logger.error(error)
            return badRequestResponse("An error occured and the user could not be suspended.", res);
        }
    }
);

export const removeSuspension = onRequest(
    {cors: true},
    async (req, res) => {
        if (!await verifyToken(req)) {
            return unauthorizedResponse(res);
        }

        const uid = req.body.data as string;
        
        if (!uid) {
            return badRequestResponse("The user ID provided is invalid.", res);
        }

        try {
            
            await admin.firestore().collection(FirestoreCollections.users.toString())
                .doc(uid).update({
                    suspended: null
                })

            return okResponse("User unsuspended.", 200, res);

        } catch (error) {
            logger.error(error)
            return badRequestResponse("An error occured and the user could not be unsuspended.", res);
        }
    }
);

export const toggleActivation = onRequest(
    {cors: true},
    async (req, res) => {
        if (!await verifyToken(req)) {
            return unauthorizedResponse(res);
        }

        const userId = req.body.data as string;

        if (!userId) return badRequestResponse("The user ID provided is invalid.", res);

        try {
            
            const userDoc = await admin.firestore().collection(FirestoreCollections.users.toString())
                .doc(userId).get();

            const user = userDoc.data() as UserModel;

            console.log(user)

            // await admin.firestore().collection(FirestoreCollections.users.toString())
            //     .doc(userId).update({
            //         isActive: !user.isActive
            //     });

            return okResponse("The user's status has been updated", 200, res);

        } catch (error) {
            logger.error(error)
            return badRequestResponse("An error occurred and the user active status could not be updated.", res);
        }
    }
)