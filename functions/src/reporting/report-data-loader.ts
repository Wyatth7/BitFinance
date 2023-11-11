import {DateRange} from "../shared/models/time/date-range";
import {PreConfigurationData} from "../shared/models/report/pre-configuration-data/pre-configuration-data";
// import {
//   PreConfiguredDataBalanceSheet
// } from "../shared/models/report/pre-configuration-data/balance-sheet/pre-configured-data-balance-sheet";
import * as admin from 'firebase-admin';
import {FirestoreCollections} from "../shared/enums/firestore-collections";
import {FirebaseSubCollections} from "../shared/enums/firestore-sub-collections";
import {AccountModel} from "../shared/models/accounts/account-model";
import {AccountType} from "../shared/enums/accounts/account-type";
import {NormalType} from "../shared/enums/accounts/normal-type";
import {AccountEntry} from "../shared/models/journals/account-journal";
import {PreConfigurationRawData} from "../shared/models/report/pre-configuration-data/pre-configuration-raw-data";
import {StatementType} from "../shared/enums/accounts/statement-type";
import {AccountData} from "../shared/models/report/pre-configuration-data/balance-sheet/account-data";
import {
  PreConfiguredDataBalanceSheet
} from "../shared/models/report/pre-configuration-data/balance-sheet/pre-configured-data-balance-sheet";
import {BalanceSheetTotals} from "../shared/models/report/pre-configuration-data/balance-sheet/balanceSheetTotals";

export class ReportDataLoader {

  /**
   * Loads all account / transaction data for each report type
   */
  static async loadData(dateRange: DateRange): Promise<PreConfigurationData> {

    // list of accounts and their entries (entry in desc order)
    const loadAccountEntryData = await this.loadAccountData(dateRange);

    const balanceSheetData = await this.loadBalanceSheet(loadAccountEntryData);

    return {
      balanceSheet: balanceSheetData
    }
  }

  /**
   * Gets pre-configured balance sheet data
   * @param rawData raw account entry data
   */
  private static async loadBalanceSheet(rawData: PreConfigurationRawData[]): Promise<PreConfiguredDataBalanceSheet> {

    // get array of all data in balance sheet.
    const filteredData = rawData.filter(r => r.statementType === StatementType.BS);

    const totals: BalanceSheetTotals = {
      asset: 0,
      liability: 0,
      equity: 0
    }

    const accountData: AccountData[] = filteredData.map(f => {
      const balance = f.entries[0].balance;

      switch (f.accountType) {
        case AccountType.asset:
          totals.asset += balance;
          break;
        case AccountType.liability:
          totals.liability += balance;
          break;
        case AccountType.equity:
          totals.equity += balance;
          break;
      }

      return {
        accountName: f.accountName,
        accountType: f.accountType,
        balance,
        normalType: f.normalType
      }
    })


    return {
      accountData,
      totals
    }
  }

  private static async loadAccountData(dateRange: DateRange) {
    // load each account and their sub-collection data
    // filter this data by the sub-collection's creation date
    const accountRef = admin
      .firestore()
      .collection(FirestoreCollections.accounts);

    // get account
    const accountSnapshot = await accountRef.get();
    if (accountSnapshot.empty) {
      throw new Error('Account list is empty');
    }

    const accounts: { accountId: string; name: string, accountType: AccountType, normalType: NormalType, statementType: StatementType }[] = accountSnapshot.docs
      .map(a => {
        const data = a.data() as AccountModel;

        return {
          accountId: data.accountId,
          name: data.accountName,
          accountType: data.accountType,
          normalType: data.normalType,
          statementType: data.statementType
        }
      })

    let rawData: PreConfigurationRawData[] = [];

    for (const account of accounts) {
      const entrySnapshot = await accountRef.doc(account.accountId)
        .collection(FirebaseSubCollections.accountJournal)
        .where('creationDate', '>=', dateRange.start)
        .where('creationDate', '<=', dateRange.end)
        .orderBy('creationDate', 'desc')
        .get();

      if (entrySnapshot.empty) {
        continue
      }

      const entries = entrySnapshot.docs.map(e => e.data() as AccountEntry);

      rawData.push({
        accountName: account.name,
        accountType: account.accountType,
        normalType: account.normalType,
        statementType: account.statementType,
        entries
      });
    }

    return rawData;
  }
}
