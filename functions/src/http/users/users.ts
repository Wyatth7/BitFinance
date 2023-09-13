import { onRequest } from "firebase-functions/v2/https"
import * as admin from 'firebase-admin';
import { UserModel } from "../../shared/models/auth/user-model";
import { verifyToken } from "../../shared/helpers/auth/verify-token";
import { badRequestResponse, okResponse, unauthorizedResponse } from "../../shared/responses/responses";
import { FirestoreCollections } from "../../shared/enums/firestore-collections";
import { UserListResponseModel } from "../../shared/models/auth/responses/users/user-list-response-model";

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

        let users: UserListResponseModel = {acceptedUsers: [], requestedUsers: []};

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
)