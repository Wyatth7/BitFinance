import * as admin from 'firebase-admin';
import { onRequest } from 'firebase-functions/v2/https';
import { CreateUserModel } from '../../shared/models/auth/create-user-model';
import * as logger from 'firebase-functions/logger'
import { UserRecord } from 'firebase-admin/auth';
import { FirestoreCollections } from '../../shared/enums/firestore-collections';

export const createUser = onRequest(
    {cors: true},
    async (req, res) => {
        const user = req.body.data as CreateUserModel;
        
        if (!user) {
            res.status(400)
                .json({
                    result: "There was a problem with the provided data, and a user could not be created."
                })
        }

        try {
            const uid = await createFirebaseUser(user);

            await admin.firestore().collection(FirestoreCollections.users.toString()).add({
                uid,
                ...user
            });

            res.status(201).json({
                result: { uid }
            })

        } catch (error: any) {
            logger.error(error.message);

            res.status(400).json({
                result: 'There was a problem during the request, and the user could not be created.'
            });
        }

    }
)

/**
 * Creates a user in Firebase Authentication
 * @param createUserModel Model data of user to be created
 * @returns A new user id
 */
const createFirebaseUser = async (createUserModel: CreateUserModel): Promise<string> => {
    const createdUser: UserRecord = await admin.auth().createUser({
        email: createUserModel.email,
        password: createUserModel.password,
        displayName: 'test',
        emailVerified: true
        // photoURL: '', we may need this, not sure about the requirements doc.
    });

    return createdUser.uid;
}
