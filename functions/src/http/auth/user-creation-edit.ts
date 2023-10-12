import * as admin from 'firebase-admin';
import { onRequest } from 'firebase-functions/v2/https';
import { CreateUserModel } from '../../shared/models/auth/create-user-model';
import * as logger from 'firebase-functions/logger'
import { UserRecord } from 'firebase-admin/auth';
import { FirestoreCollections } from '../../shared/enums/firestore-collections';
import { UserModel } from '../../shared/models/users/user-model';
import { badRequestResponse, okResponse, unauthorizedResponse } from '../../shared/responses/responses';
import { Encryptor } from '../../shared/helpers/encryption/encryptor';
import { AcceptDenyModel } from '../../shared/models/auth/accept-deny-model';
import { verifyToken } from '../../shared/helpers/auth/verify-token';
import { Emailer } from '../../shared/helpers/messaging/emailer';
import { ForgotPasswordModel } from '../../shared/models/auth/forgot-password-model';
import { UserWithIdModel } from '../../shared/models/users/user-with-id-model';

/**
 * Creates a user.
 */
export const createUser = onRequest(
    {cors: true},
    async (req, res) => {
        if (!await verifyToken(req)) {
            return unauthorizedResponse(res);
        }

        const password = req.body.data.password as string;
        const user = configureCreatedUser(req.body.data as CreateUserModel);
        
        if (!user) {
            return badRequestResponse("There was a problem with the provided data, and a user could not be created.", res)
        }

        try {
            const uid = await createFirebaseUser(user, password);

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
        const createUser = req.body.data as CreateUserModel;
        if (!createUser) return badRequestResponse("The user data provided is invalid.", res);
        try {
            const user = configureCreatedUser(createUser);
            user.requested = true;

            const uid = await createFirebaseUser(user, createUser.password, true);
            
            await admin.firestore().collection(FirestoreCollections.users.toString())
                .doc(uid).create({uid, ...user});

            // send email to admin users
            await Emailer.sendEmailToAdmin(
                'New Requested User',
                `${user.firstName} ${user.lastName} has requested to join BitFinance.\n\nLogin to accept or decline the user.\n\nhttps://accounting-app-test.web.app/users/view`
                )

            return okResponse({}, 200, res);

        } catch (error: any) {
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
        if (!await verifyToken(req)) {
            return unauthorizedResponse(res);
        }
        
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

            await Emailer.sendSingleFromAdmin(user.email, 'User Request Accepted', 'Your user request has been accepted to BitFiannce.\n\nClick the link below to login.\n\nhttps://accounting-app-test.web.app/auth/login')
            
            return okResponse({}, 200, res);
        } catch (error) {
            logger.error(error);
            return badRequestResponse("An error occurred and the user requested status could not be changed.", res);
        }

    }
);

export const forgotPassword = onRequest(
    {cors: true},
    async (req, res) => {

        const dto = req.body.data as ForgotPasswordModel;

        try {

            const userRef = admin.firestore()
                .collection(FirestoreCollections.users.toString());
            
            const firestoreUserSnapshot = await userRef
                .where('email', '==', dto.email)
                .get();

            if (firestoreUserSnapshot.empty) {
                return badRequestResponse('Invalid user information.', res);
            }

            const user = firestoreUserSnapshot.docs[0].data() as UserWithIdModel;

            const emailCompare = user.email.toLowerCase().trim() === dto.email.toLowerCase().trim();
            const usernameCompare = user.userName.toLowerCase() === dto.username.toLowerCase().trim();
            const dobCompare = new Date(user.securityQuestionAnswer).toISOString().split('T')[0] === dto.dateOfBirth.split('T')[0];
            
            if ( emailCompare && usernameCompare && dobCompare ) {

                await admin.auth().updateUser(user.uid, {
                    password: dto.password
                })

                const encryptedPass = Encryptor.base64Encryption(dto.password);

                const userPasswords = user.passwords;
                userPasswords[user.passwords.length - 1].isActive = false;
                userPasswords.push({
                    isActive: true,
                    password: encryptedPass
                });

                await userRef
                    .doc(user.uid)
                    .update({
                        passwords: userPasswords
                    })

            
                return okResponse({}, 200, res);
            }

            return badRequestResponse('Invalid user information.', res);

        } catch (error) {
            logger.error(error);
            return badRequestResponse("Forgot password validation failed.", res);
        }

    }
);

/**
 * Creates a user in Firebase Authentication
 * @param createUserModel Model data of user to be created
 * @returns A new user id
 */
const createFirebaseUser = async (createUserModel: UserModel, password: string, disable = false): Promise<string> => {
    const createdUser: UserRecord = await admin.auth().createUser({
        email: createUserModel.email,
        password,
        displayName: createUserModel.userName,
        emailVerified: true,
        disabled: disable
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
        password: Encryptor.base64Encryption(newUser.password),
        isActive: true
    })

    return user;
}