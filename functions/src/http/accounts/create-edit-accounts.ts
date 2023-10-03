import * as admin from 'firebase-admin';
import * as logger from 'firebase-functions/logger';
import { onRequest } from 'firebase-functions/v2/https';
import { verifyToken } from '../../shared/helpers/auth/verify-token';
import { badRequestResponse, okResponse, unauthorizedResponse } from '../../shared/responses/responses';
import { CreateEditAccountDto } from '../../shared/models/accounts/dto/create-edit-account-dto';
import { AccountModel } from '../../shared/models/accounts/account-model';
import { FirestoreCollections } from '../../shared/enums/firestore-collections';
import { Guid } from '../../shared/helpers/guids/generate-guid';

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

const configureAccount = (createEditData: CreateEditAccountDto): AccountModel => {

    return {
        accountName: createEditData.general.accountName.trim(),
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