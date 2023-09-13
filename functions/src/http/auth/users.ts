import { onRequest } from "firebase-functions/v2/https"
import * as admin from 'firebase-admin';
import { UserModel } from "../../shared/models/auth/user-model";
import { verifyToken } from "../../shared/helpers/auth/verify-token";
import { badRequestResponse, okResponse, unauthorizedResponse } from "../../shared/responses/responses";



export const getUser = onRequest(
    {cors: true},
    async (req, res) => {
        if (!await verifyToken(req)) {
            return unauthorizedResponse(res);
        }

        const userId = req.body.data as string;

        const snapshot = await admin.firestore().collection('0')
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