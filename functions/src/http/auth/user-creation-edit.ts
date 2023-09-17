import * as admin from 'firebase-admin';
import { onRequest } from 'firebase-functions/v2/https';
import { CreateUserModel } from '../../shared/models/auth/create-user-model';
import * as logger from 'firebase-functions/logger'
import { UserRecord } from 'firebase-admin/auth';
import { FirestoreCollections } from '../../shared/enums/firestore-collections';
import { UserModel } from '../../shared/models/users/user-model';
import { badRequestResponse, okResponse } from '../../shared/responses/responses';

export const createUser = onRequest(
    {cors: true},
    async (req, res) => {
        const user = configureCreatedUser(req.body.data as CreateUserModel);
        
        if (!user) {
            return badRequestResponse("There was a problem with the provided data, and a user could not be created.", res)
        }

        try {
            const uid = await createFirebaseUser(user);

            await admin.firestore().collection(FirestoreCollections.users.toString())
                .doc(uid).create({
                    uid,
                    ...user
                })

            return okResponse(uid, 201, res);

        } catch (error: any) {
            logger.error(error.message);

            return badRequestResponse('There was a problem during the request, and the user could not be created.', res)
        }

    }
);

/**
 * Creates a user in Firebase Authentication
 * @param createUserModel Model data of user to be created
 * @returns A new user id
 */
const createFirebaseUser = async (createUserModel: UserModel): Promise<string> => {
    const createdUser: UserRecord = await admin.auth().createUser({
        email: createUserModel.email,
        password: createUserModel.passwords[0].password,
        displayName: createUserModel.userName,
        emailVerified: true
        // photoURL: '', we may need this, not sure about the requirements doc.
    });

    return createdUser.uid;
}

/**
 * This method takes in a user and configures properties for
 * admin created users.
 * @param user The user that will be created
 * @returns An configured user
 */
const configureCreatedUser = (newUser: CreateUserModel): UserModel => {
    let user: UserModel = {...newUser, passwords: [], suspended: null, isActive: true};

    // configure username
    const date = new Date();
    user.userName = `${user.firstName[0].toLowerCase()}${user.lastName.toLowerCase()}${date.getUTCMonth() + 1}${date.getUTCFullYear()}`

    // configure requested status
    user.requested = false;

    // add new password
    user.passwords.push({
        password: newUser.password,
        isActive: true
    })

    return user;
}