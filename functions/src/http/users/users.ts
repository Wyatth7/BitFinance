import { onRequest } from "firebase-functions/v2/https"
import * as admin from 'firebase-admin';
import { UserModel } from "../../shared/models/users/user-model";
import { verifyToken } from "../../shared/helpers/auth/verify-token";
import { badRequestResponse, okResponse, unauthorizedResponse } from "../../shared/responses/responses";
import { FirestoreCollections } from "../../shared/enums/firestore-collections";
import { UserListModel } from "../../shared/models/users/user-list-model";
import { SuspendUserModel } from "../../shared/models/users/suspend-user-model";
import * as logger from "firebase-functions/logger";
import { EditUserModel } from "../../shared/models/auth/edit-user-model";

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
            
            const now = new Date();
            if (new Date(suspendModel.suspendDates.start) <= now && new Date(suspendModel.suspendDates.end) > now) {
                await admin.auth().updateUser(suspendModel.uid, {
                    disabled: true
                })
            }

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
            
            await admin.auth().updateUser(uid, {disabled: false})

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

            const newActivationStatus = !user.isActive;

            await admin.auth().updateUser(userId, {disabled: !newActivationStatus})

            await admin.firestore().collection(FirestoreCollections.users.toString())
                .doc(userId).update({
                    isActive: newActivationStatus
                });

            return okResponse("The user's status has been updated", 200, res);

        } catch (error) {
            logger.error(error)
            return badRequestResponse("An error occurred and the user active status could not be updated.", res);
        }
    }
)

export const editUser = onRequest(
    {cors: true},
    async (req, res) => {
        const user = req.body.data as EditUserModel;

        if (!user) return badRequestResponse("The user data provided is invalid.", res);

        try {
            
            // udpate user in auth
            const displayName = `${user.firstName} ${user.lastName}`
            
            await admin.auth().updateUser(user.uid, {
                email: user.email,
                displayName: displayName
            });
    
            // const userName = `${user.firstName[0]}${user.lastName}${new Date().toLocaleDateString('en', {month: '2-digit', year: '2-digit'})}`
            // update user in firestore
            await admin.firestore().collection(FirestoreCollections.users.toString())
                .doc(user.uid).update({
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                });
    
            return okResponse({}, 200, res);

        } catch (error) {
            logger.error(error);
            return badRequestResponse("An error occurred during the request and the user could not be updated.", res);
        }
    }
);
