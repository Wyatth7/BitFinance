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
import { ToggleActivationDto } from '../../shared/models/accounts/dto/toggle-activation-dto';
import { EventLogger } from '../../shared/helpers/log/event-logger';
import { LogActionType } from '../../shared/models/enums/log-action-type';

/**
 * Creates an account
 */
export const createAccount = onRequest(
    {cors: true},
    async (req, res) => {
        if (!await verifyToken(req)) {
            return unauthorizedResponse(res);
        }

        const dto: CreateEditAccountDto = req.body.data;
        console.log(dto);
        

        const account = configureAccount(dto);

        try {
            
            const accountsRef = admin.firestore().collection(FirestoreCollections.accounts);

            // check if name and number are taken.
            const nameNumberValid = await validateAccountNameNumber(account.accountName, account.accountNumber);

            // if docs exist, throw 
            if (!nameNumberValid) {
                return badRequestResponse('An account with this name or account number already exists.', res);
            }

            // create account
            await accountsRef.doc(account.accountId).set(account);

            // Create event log
            await createAccountEventLog(account, dto.userId);

            return okResponse({}, 201, res);
        } catch (error) {
            logger.error(error);
            return badRequestResponse('There was an error when creating the account. Please try again later.', res);
        }
    }
)

/**
 * Edits an existing account
 */
export const editAccount = onRequest(
    {cors: true},
    async (req, res) => {
        if (!await verifyToken(req)) {
            return unauthorizedResponse(res);
        }

        const dto: EditAccountDto  = req.body.data;

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
                normalType: dto.types.normalType,
                balance: dto.general.balance
            })

            // call event log once it gets built.
            const before = account.data() as AccountModel;
            const after: AccountModel =  {
                accountName: dto.general.accountName,
                accountNumber: dto.general.accountNumber,
                description: dto.general.description,
                accountType: dto.types.accountType,
                statementType: dto.types.statementType,
                normalType: dto.types.normalType,
                balance: dto.general.balance,
                isActive: before.isActive,
                createdOn: before.createdOn,
                accountId: before.accountId
            }

            await createAccountEventLog(after, dto.userId, before)

            return okResponse({}, 200, res); 
        } catch (error) {
            logger.error(error);
            return badRequestResponse('There was an error while updating the account.', res);
        }
    }
);

/**
 * Toggles account activation status
 */
export const toggleActivation = onRequest(
    {cors: true},
    async (req, res) => {
        if (!await verifyToken(req)) {
            return unauthorizedResponse(res);
        }

        try {
            // get account
            const dto: ToggleActivationDto = req.body.data;        

            if (!dto) {
                return badRequestResponse('The toggle activation data is invalid.', res);
            }

            const accountRef = admin
                .firestore()
                .collection(FirestoreCollections.accounts)
                .doc(dto.accountId);

            const accountSnapshot = await accountRef.get();

            if (!accountSnapshot.exists) {
                return badRequestResponse('This account does not exist.', res);
            }

            const account = accountSnapshot.data() as AccountModel;
            
            // validate that balance is 0
            if (account.balance !== 0) {
                return badRequestResponse('Unable to toggle active status because the account balance is not 0.', res);
            }

            // toggle account activation status
            await accountRef.update({
                isActive: !account.isActive
            });

            // update event log
            const updatedAccount = {...account};
            updatedAccount.isActive = !updatedAccount.isActive;

            await createAccountEventLog(updatedAccount, dto.userId, account)

            return okResponse({}, 200, res);
        } catch (error) {
            logger.error(error);
            return badRequestResponse('Could not toggle account activation status.', res);
        }
    }
);

const configureAccount = (createEditData: CreateEditAccountDto): AccountModel => {

    const formattedAccountNumber = `${+createEditData.types.accountType}${createEditData.general.accountNumber}`

    return {
        accountName: createEditData.general.accountName.trim().toLowerCase(),
        accountNumber:  +formattedAccountNumber,
        description: createEditData.general.description,
        balance: createEditData.general.balance,
        statementType: +createEditData.types.statementType,
        accountType: +createEditData.types.accountType,
        normalType: +createEditData.types.normalType,
        accountId: Guid.createGuid(),
        createdOn: new Date().toISOString(),
        isActive: true
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
const validateAccountNameNumber = async (name: string, number: number, accountId?: string): Promise<boolean> => { 

    const collectionRef = admin.firestore().collection(FirestoreCollections.accounts);

    const numberExists = await collectionRef
        .where('accountNumber', '==', number)
        .get();

    // If number exists somewhere, validate some more
    if (!numberExists.empty) {
        if (!accountId) return false;

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
        if (!accountId) return false;

        const account = nameExists.docs.find(accountDoc => (accountDoc.data() as AccountModel).accountName);
        if (!account && nameExists.docs.length > 0) return false;

        const accountData = account!.data();
        if (accountData.accountId !== accountId && nameExists.docs.length > 0) return false;
    }

    return true;
}

const createAccountEventLog = async (after: AccountModel, createdById: string, before?: AccountModel) => {

    await EventLogger.createEventLog({
        beforeChange: before || null,
        afterChange: after,
        collection: FirestoreCollections.accounts,
        userId: createdById,
        hostId: after.accountId,
        logAction: before ? LogActionType.update : LogActionType.create,
        dateChanged: ''
    });
}