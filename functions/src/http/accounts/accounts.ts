import { onRequest } from "firebase-functions/v2/https";
import { verifyToken } from "../../shared/helpers/auth/verify-token";
import { badRequestResponse, okResponse, unauthorizedResponse } from "../../shared/responses/responses";
import * as admin from 'firebase-admin';
import { FirestoreCollections } from "../../shared/enums/firestore-collections";
import * as logger from 'firebase-functions/logger';
import { AccountsListItemModel } from "../../shared/models/accounts/accounts-list-item-model";
import { BalanceTotalsModel } from "../../shared/models/accounts/responses/balance-totals-model";
import { AccountType } from "../../shared/models/enums/account-type";
import { AccountListResponseModel } from "../../shared/models/accounts/responses/account-list-response-model";
import { AccountModel } from "../../shared/models/accounts/account-model";

export const getAllAccounts = onRequest(
    {cors: true},
    async (req, res) => {
        if (!await verifyToken(req)) {
            return unauthorizedResponse(res);
        }

        try {
            const accountsSnapshot = await admin.firestore()
                .collection(FirestoreCollections.accounts.toString())
                .get()
        
            if (accountsSnapshot.empty) {
                return okResponse([], 200, res);
            }

            const balances: BalanceTotalsModel = {
                asset: 0,
                liability: 0,
                equity: 0
            }
            
            // sort accounts by category
            const accounts = accountsSnapshot.docs
                .map(accountDoc => {
                    const accountModel = accountDoc.data() as AccountModel

                    switch(accountModel.accountType) {
                        case AccountType.asset:
                            balances.asset += accountModel.balance
                            break;
                        case AccountType.liability:
                            balances.liability += accountModel.balance
                            break;
                        case AccountType.equity:
                            balances.equity += accountModel.balance
                            break;
                        default: break;
                    }

                    const account: AccountsListItemModel = {
                        accountName: accountModel.accountName,
                        accountNumber: accountModel.accountNumber,
                        balance: accountModel.balance,
                        category: accountModel.accountType,
                        accountId: accountModel.accountId,
                        isActive: accountModel.isActive,
                        // will be replaced with journal collection count.
                        entries: 0
                    }

                    return account;
                })
                .sort((a: AccountsListItemModel, b: AccountsListItemModel) => a.category - b.category );
    
            const accountListResponse: AccountListResponseModel = {
                accounts: accounts,
                balanceTotals: balances
            }

            return okResponse(accountListResponse, 200, res);        
            
        } catch (error) {
            logger.error(error)
            return badRequestResponse("An error occurred while getting the chart of accounts. Try again later.", res);
        }
    }
);

export const getAccount = onRequest(
    {cors: true},
    async (req, res) => {
        if (!await verifyToken(req)) {
            return unauthorizedResponse(res);
        }

        const accountId = req.body.data as string;

        if (!accountId) return badRequestResponse('The account ID provided is invalid.', res);

        try {
            
            // get account
            const accountSnapshot = await admin
            .firestore()
            .collection(FirestoreCollections.accounts)
            .doc(accountId)
            .get();

            if (!accountSnapshot.exists) return badRequestResponse(`Could not find an account with ID [${accountId}]`, res);

            const account = accountSnapshot.data();

            return okResponse(account, 200, res);
        } catch (error) {
            logger.error(error);
            return badRequestResponse('An error occured while getting the account, and the account could not be send.', res);
        }
    }
);