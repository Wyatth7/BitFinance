import * as admin from 'firebase-admin';
import { onRequest } from 'firebase-functions/v2/https';
import { CreateUserModel } from '../../shared/models/auth/create-user-model';
import * as logger from 'firebase-functions/logger'
import { UserRecord } from 'firebase-admin/auth';
import { FirestoreCollections } from '../../shared/enums/firestore-collections';
import { UserModel } from '../../shared/models/users/user-model';
import { badRequestResponse, okResponse } from '../../shared/responses/responses';
import { Encryptor } from '../../shared/helpers/encryption/encryptor';
import { AcceptDenyModel } from '../../shared/models/auth/accept-deny-model';

/**
 * Creates a user.
 */
export const createUser = onRequest(
    {cors: true},
    async (req, res) => {
        const user = configureCreatedUser(req.body.data as CreateUserModel);
        
        if (!user) {
            return badRequestResponse("There was a problem with the provided data, and a user could not be created.", res)
        }

        try {
            const uid = await createFirebaseUser(user);

            user.passwords[0].password = Encryptor.base64Encryption(user.passwords[0].password)

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
* Signup user 
*/
export const userSignUp = onRequest(
    {cors: true},
    async (req, res) => {
        const user = req.body.data as CreateUserModel;
        if (!user) return badRequestResponse("The user data provided is invalid.", res);
        try {
            user.requested = true;
            (user as any).suspended = null;
            
            await admin.firestore().collection("users").doc().set(user);
            return okResponse({}, 200, res);

        } catch (error) {
            logger.error(error);
            return badRequestResponse("An error occurred during the request and the user could not be created.", res);
        }
    }
);

/**
 * Accepts or declines an accepted user
 */
export const acceptDenyUser = onRequest(
    {cors: true},
    async (req, res) => {

        const acceptDenyData = req.body.data as AcceptDenyModel

        if (!acceptDenyData) return badRequestResponse("The user request data provided was invalid.", res);

        try {
            const userSnapshot = await admin.firestore()
                .collection(FirestoreCollections.users.toString())
                .doc(acceptDenyData.uid).get();
            
            const user = userSnapshot.data() as UserModel;

            if (!user.requested) return badRequestResponse("User has already been accepted.", res);

            if (!acceptDenyData.shouldAccept) {
                // delete user from firestore
                await admin.firestore().collection(FirestoreCollections.users.toString())
                    .doc(acceptDenyData.uid).delete();

                // delete user from auth
                await admin.auth().deleteUser(acceptDenyData.uid);

                return okResponse({}, 200, res);
            }

            // update user to accepted
            await admin.auth().updateUser(acceptDenyData.uid, {
                disabled: false
            });
            
            // set user requested to false
            await admin.firestore()
                .collection(FirestoreCollections.users.toString())
                .doc(acceptDenyData.uid)
                .update({
                    requested: false
            });
            
            return okResponse({}, 200, res);
        } catch (error) {
            logger.error(error);
            return badRequestResponse("An error occurred and the user requested status could not be changed.", res);
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
    user.userName = `${user.firstName[0].toLowerCase()}${user.lastName.toLowerCase()}${String(date.getUTCMonth() + 1).padStart(2, '0')}${date.getUTCFullYear().toString().substring(2)}`

    // configure requested status
    user.requested = false;

    // add new password
    user.passwords.push({
        password: newUser.password,
        isActive: true
    })

    return user;
}