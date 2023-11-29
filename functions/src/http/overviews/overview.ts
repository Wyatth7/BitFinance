import { onRequest } from "firebase-functions/v2/https";
import * as logger from 'firebase-functions/logger';
import { badRequestResponse, okResponse } from "../../shared/responses/responses";
import * as admin from "firebase-admin";
import { FirestoreCollections } from "../../shared/enums/firestore-collections";
import { OverviewModel } from "../../shared/models/overview/overview-model";
import { JournalApprovalType } from "../../shared/models/enums/journal-approval-type";
import {IncomeExpense} from "../../shared/models/calculations/income-expense";
import {StatementType} from "../../shared/enums/accounts/statement-type";
import {AccountModel} from "../../shared/models/accounts/account-model";
import {ReportCalculations} from "../../shared/helpers/calculations/report-calculations";
import {BalanceTotalsModel} from "../../shared/models/accounts/responses/balance-totals-model";
import {RatioSummary} from "../../shared/models/overview/ratios/ratio-summary";
import {RatioCalculations} from "../../shared/helpers/calculations/ratio-calculations";
import {FirebaseSubCollections} from "../../shared/enums/firestore-sub-collections";
import {EntryCalculations} from "../../shared/helpers/calculations/entry-calculations";
import {AccountEntry} from "../../shared/models/journals/account-journal";

export const getOverview = onRequest(
    {cors: true},
    async (req, res) => {
        try {

            const usersSnapshot = await admin.firestore().collection(FirestoreCollections.users.toString())
                .where('requested', '==', false)
                .count().get();

            const requestedSnapshot = await admin.firestore().collection(FirestoreCollections.users.toString())
                .where('requested', '==', true)
                .count().get();

            const accountsSnapshot = await admin.firestore().collection(FirestoreCollections.accounts)
                .count().get();

            const requestedJournalSnapshot = await admin.firestore().collection(FirestoreCollections.journals.toString())
                .where('approvalType', '==', JournalApprovalType.requested)
                .count().get();

            const approvedJournalSnapshot = await admin.firestore().collection(FirestoreCollections.journals.toString())
                .where('approvalType', '==', JournalApprovalType.approved)
                .count().get();

            const declinedJournalSnapshot = await admin.firestore().collection(FirestoreCollections.journals.toString())
                .where('approvalType', '==', JournalApprovalType.declined)
                .count().get();

            const ratios = await calculateRatios();


            const overviewData: OverviewModel = {
                users: {
                    requested: requestedSnapshot.data().count,
                    accepted: usersSnapshot.data().count,
                },
                journals: {
                    requested: requestedJournalSnapshot.data().count,
                    approved: approvedJournalSnapshot.data().count,
                    declined: declinedJournalSnapshot.data().count,
                },
                accounts: accountsSnapshot.data().count,
              ratios
            }

            return okResponse(overviewData, 200, res);

        } catch (error) {
            logger.error(error);
            return badRequestResponse("Could not get user overview data.", res);
        }
    }
);

const calculateRatios = async (): Promise<RatioSummary> => {
  const incomeExpense = await getIncomeExpenseTotals();
  const balanceTotals = await getBalanceSheetTotals();

  return RatioCalculations.calculateAll(incomeExpense, balanceTotals);
}

/**
 * Gets income and expense data for the current time
 */
const getIncomeExpenseTotals = async (): Promise<IncomeExpense> => {
  // get all accounts related to income data
  const accountsSnapshot = await admin.firestore()
    .collection(FirestoreCollections.accounts)
    .where('statementType', '==', StatementType.IS)
    .get();

  if (accountsSnapshot.empty) return {
    grossIncome: 0,
    netIncome: 0,
    expense: 0
  };

  const accounts = accountsSnapshot.docs.map(a => a.data() as AccountModel);

  const totals = ReportCalculations.incomeExpense(accounts);

  // look for cost of goods sold
  totals.costOfGoodsSold = await costOfGoodsSold();

  return totals;
}

/**
 * Gets balance sheet totals
 */
const getBalanceSheetTotals = async (): Promise<BalanceTotalsModel> => {
  // get all accounts related to balance sheet
  const accountsSnapshot = await admin.firestore()
    .collection(FirestoreCollections.accounts)
    .where('statementType', '==', StatementType.BS)
    .get();

  if (accountsSnapshot.empty) return {
    asset: 0,
    liability: 0,
    equity: 0
  };

  const accounts = accountsSnapshot.docs
    .map(a => a.data() as AccountModel);

  return ReportCalculations.balanceSheet(accounts);
}

const costOfGoodsSold = async (): Promise<number> => {
  const accountRef = admin.firestore()
    .collection(FirestoreCollections.accounts)

  const accountSnapshot = await accountRef
    .where('accountName', '==', 'inventory')
    .get();

  if (accountSnapshot.empty) return 0;

  const inventory = accountSnapshot.docs[0].data() as AccountModel;

  const accountEntrySnapshot = await accountRef
    .doc(inventory.accountId)
    .collection(FirebaseSubCollections.accountJournal)
    .where('creationDate', '<=', new Date().toISOString())
    .orderBy('creationDate', 'desc')
    .get();

  if (accountEntrySnapshot.empty) return 0;

  let purchases = 0;
  const accountEntries = accountEntrySnapshot.docs.map(ae => {
    const entry = ae.data() as AccountEntry

    purchases += entry.debit;

    return entry;
  })

  return EntryCalculations.costOfGoodsSold(0, accountEntries[0].balance, purchases);
}
