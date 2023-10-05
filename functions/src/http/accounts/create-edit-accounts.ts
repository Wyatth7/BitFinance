import * as admin from 'firebase-admin';
import * as logger from 'firebase-functions/logger';
import { onRequest } from 'firebase-functions/v2/https';
import { verifyToken } from '../../shared/helpers/auth/verify-token';
import { badRequestResponse, okResponse, unauthorizedResponse } from '../../shared/responses/responses';
import { CreateEditAccountDto } from '../../shared/models/accounts/dto/create-edit-account-dto';
import { AccountModel } from '../../shared/models/accounts/account-model';
import { FirestoreCollections } from '../../shared/enums/firestore-collections';
import { Guid } from '../../shared/helpers/guids/generate-guid';
import { EditAccountDto } from '../../shared/models/accounts/dto/edit-account-dto';

export const createAccount = onRequest(
    {cors: true},
    async (req, res) => {
        if (!await verifyToken(req)) {
            return unauthorizedResponse(res);
        }

        const dto = req.body.data as CreateEditAccountDto;

        const account = configureAccount(dto);

        try {
            
            const accountsRef = admin.firestore().collection(FirestoreCollections.accounts);

            // check if name and number are taken.
            const snapshot = await accountsRef
                .where('accountNumber', '==', account.accountNumber)
                .where('accountName', '==', account.accountName)
                .get();

            // if docs exist, throw 
            if (!snapshot.empty) {
                return badRequestResponse('An account with this name or account number already exists.', res);
            }

            // create account
            await accountsRef.doc(account.accountId).set(account);

            return okResponse({}, 201, res);
        } catch (error) {
            logger.error(error);
            return badRequestResponse('There was an error when creating the account. Please try again later.', res);
        }
    }
)

export const editAccount = onRequest(
    {cors: true},
    async (req, res) => {
        if (!await verifyToken(req)) {
            return unauthorizedResponse(res);
        }

        const dto = req.body.data as EditAccountDto;

        console.log(dto);
        
        try {
            const accountTitlesValid = await validateAccountNameNumber(dto.general.accountName, dto.general.accountNumber, dto.accountId);

            if (!accountTitlesValid) {
                return badRequestResponse('An account with this name or account number already exists.', res);
            }

            const collectionRef = admin.firestore()
            .collection(FirestoreCollections.accounts)
            
            //  get account
            const accountRef = collectionRef.doc(dto.accountId);
            
            const account = await accountRef.get();
            
            if (!account.exists) {
                return badRequestResponse('This account does not exist.', res);
            }

            // update form values
            await accountRef.update({
                accountName: dto.general.accountName,
                accountNumber: dto.general.accountNumber,
                description: dto.general.description,
                accountType: dto.types.accountType,
                statementType: dto.types.statementType,
                normalType: dto.types.normalType
            })

            // call event log once it gets built.

            return okResponse({}, 200, res); 
        } catch (error) {
            logger.error(error);
            return badRequestResponse('There was an error while updating the account.', res);
        }
    }
);

const configureAccount = (createEditData: CreateEditAccountDto): AccountModel => {

    return {
        accountName: createEditData.general.accountName.trim().toLowerCase(),
        accountNumber: createEditData.general.accountNumber.trim(),
        description: createEditData.general.description,
        balance: createEditData.general.balance,
        statementType: +createEditData.types.statementType,
        accountType: +createEditData.types.accountType,
        normalType: +createEditData.types.normalType,
        accountId: Guid.createGuid(),
        createdOn: new Date().toISOString()
    }
}

/**
 * Validates that a name and number are not used more than once.
 * This is some nasty code, but it gets the job done lol.
 * @param name Name of account to look for
 * @param number Number of account to look for
 * @param accountId ID of current account
 * @returns true if valid, false if invalid
 */
const validateAccountNameNumber = async (name: string, number: string, accountId: string): Promise<boolean> => { 

    const collectionRef = admin.firestore().collection(FirestoreCollections.accounts);

    const numberExists = await collectionRef
        .where('accountNumber', '==', number)
        .get();

    // If number exists somewhere, validate some more
    if (!numberExists.empty) {
        const account = numberExists.docs.find(accountDoc => (accountDoc.data() as AccountModel).accountNumber);
        if (!account && numberExists.docs.length > 0) return false;

        const accountData = account!.data();
        if (accountData.accountId !== accountId && numberExists.docs.length > 0) return false;
    }

    const nameExists = await collectionRef
    .where('accountName', '==', name.trim().toLowerCase())
    .get();
    
    // If name exists somewhere, validate some more
    if (!nameExists.empty) {
        const account = nameExists.docs.find(accountDoc => (accountDoc.data() as AccountModel).accountName);
        if (!account && nameExists.docs.length > 0) return false;

        const accountData = account!.data();
        if (accountData.accountId !== accountId && nameExists.docs.length > 0) return false;
    }

    return true;
}