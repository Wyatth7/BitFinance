import {onRequest} from "firebase-functions/v2/https";
import {verifyToken} from "../../shared/helpers/auth/verify-token";
import {badRequestResponse, okResponse, unauthorizedResponse} from "../../shared/responses/responses";
import * as admin from 'firebase-admin';
import {FirestoreCollections} from "../../shared/enums/firestore-collections";
import * as logger from 'firebase-functions/logger';
import {AccountsListItemModel} from "../../shared/models/accounts/accounts-list-item-model";
import {BalanceTotalsModel} from "../../shared/models/accounts/responses/balance-totals-model";
import {AccountType} from "../../shared/models/enums/account-type";
import {AccountListResponseModel} from "../../shared/models/accounts/responses/account-list-response-model";
import {AccountModel} from "../../shared/models/accounts/account-model";
import {FirebaseSubCollections} from "../../shared/enums/firestore-sub-collections";
import {AccountEntry} from "../../shared/models/journals/account-journal";
import {EventLogModel} from "../../shared/models/event-log/event-log-model";


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
                        entries: accountModel.entries,
                        normalType: accountModel.normalType
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

            const accountRef = admin
                .firestore()
                .collection(FirestoreCollections.accounts)
                .doc(accountId);

            // get account
            const accountSnapshot = await accountRef.get();
            const accountEntrySnapshot = await accountRef
                .collection(FirebaseSubCollections.accountJournal)
                .get();

            if (!accountSnapshot.exists) return badRequestResponse(`Could not find an account with ID [${accountId}]`, res);

            const account = accountSnapshot.data() as AccountModel;
            const entries = accountEntrySnapshot.docs.map(entry => entry.data() as AccountEntry)

            return okResponse({...account, entryList: entries}, 200, res);
        } catch (error) {
            logger.error(error);
            return badRequestResponse('An error occurred while getting the account, and the account could not be send.', res);
        }
    }
);

export const getAccountEventLogs = onRequest(
    {cors: true},
    async (req, res) => {

        const accountId = req.body.data as string;

        if (!accountId) return badRequestResponse('The account ID provided is invalid.', res);

        //const evenLogSnapshot =

    try{
        console.log(accountId);
        const eventLogQuery = admin
        .firestore()
        .collection(FirestoreCollections.eventLogs)
        .where("hostId", "==", accountId);

        const eventLogSnapshot = await eventLogQuery.get();

        console.log('Here in the cloud function\n');

        const logs = eventLogSnapshot.docs.map(entry => entry.data() as EventLogModel);

        logs.forEach((event) => {
            console.log(`The HOST ID is: ${event.hostId} and DATE is ${event.dateChanged}\n`);
        });

        return okResponse({eventLogs: logs}, 200, res);
    } catch(error){
        logger.error(error);
        return badRequestResponse('An error occured while getting the account, and the account could not be send.', res);
    }
    }
);


