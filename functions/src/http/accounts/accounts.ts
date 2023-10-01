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
                return badRequestResponse("No accounts were found.", res);
            }

            const balances: BalanceTotalsModel = {
                asset: 0,
                liability: 0,
                equity: 0
            }
            
            // sort accounts by category
            const accounts = accountsSnapshot.docs
                .map(accountDoc => {
                    const account = accountDoc.data() as AccountsListItemModel

                    switch(account.category) {
                        case AccountType.asset:
                            balances.asset += account.balance
                            break;
                        case AccountType.liability:
                            balances.liability += account.balance
                            break;
                        case AccountType.equity:
                            balances.equity += account.balance
                            break;
                        default: break;
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
)