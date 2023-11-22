import {DateRange} from "../shared/models/time/date-range";
import {PreConfigurationData} from "../shared/models/report/pre-configuration-data/pre-configuration-data";
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
import {
  PreConfigurationDataTrialBalance
} from "../shared/models/report/pre-configuration-data/trial-balance/pre-configuration-data-trial-balance";
import {
  PreConfiguredDataIncomeStatement
} from "../shared/models/report/pre-configuration-data/income-statement/pre-configured-data-income-statement";

export class ReportDataLoader {

  /**
   * Loads all account / transaction data for each report type
   */
  static async loadData(dateRange: DateRange): Promise<PreConfigurationData> {

    // list of accounts and their entries (entry in desc order)
    const loadAccountEntryData = await this.loadAccountData(dateRange);

    const balanceSheetData = this.loadBalanceSheet(loadAccountEntryData);
    const trialBalanceData = this.loadTrialBalance(loadAccountEntryData);
    const incomeStatementData = this.loadIncomeStatement(loadAccountEntryData);

    return {
      balanceSheet: balanceSheetData,
      trialBalance: trialBalanceData,
      incomeStatement: incomeStatementData
    }
  }

  /**
   * Gets pre-configured balance sheet data
   * @param rawData raw account entry data
   */
  private static loadBalanceSheet(rawData: PreConfigurationRawData[]): PreConfiguredDataBalanceSheet {

    // get array of all data in balance sheet.
    const filteredData = rawData.filter(r => r.statementType === StatementType.BS);

    const totals: BalanceSheetTotals = {
      asset: 0,
      liability: 0,
      equity: 0
    }

    const accountData: AccountData[] = filteredData.map(f => {
      const balance = f.entries[0]?.balance || f.balance;

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

  private static loadTrialBalance(rawData: PreConfigurationRawData[]): PreConfigurationDataTrialBalance {
    // Add/subtract debits and credits from each account based on their normal type
    let totalDebits = 0;
    let totalCredits = 0;
    const accountData: AccountData[] = rawData.map(r => {
      let accountBalance = 0;

      // get account balance for entry list
      for (const entry of r.entries) {
        if (r.normalType === NormalType.debit) {
          // add debits, subtract credits
          accountBalance += entry.debit;
          accountBalance -= entry.credit;
        }else {
          accountBalance -= entry.debit;
          accountBalance += entry.credit;
        }
      }

      if (r.normalType === NormalType.debit) {
        totalDebits += accountBalance;
      }else {
        totalCredits += accountBalance;
      }

      return {
        accountName: r.accountName,
        balance: r.normalType === NormalType.debit
          ? [accountBalance, 0]
          : [0, accountBalance],
        normalType: r.normalType,
        accountType: r.accountType
      }
    });

    // order by Asset, Liability, Equity


    return {
      accountData,
      totalCredits,
      totalDebits
    }
  }

  private static loadIncomeStatement(rawData: PreConfigurationRawData[]): PreConfiguredDataIncomeStatement {
    const filteredData = rawData.filter(r => r.statementType === StatementType.IS);

    let netIncome = 0;
    let grossIncome = 0;
    let expense = 0
    const incomeAccountData: AccountData[] = [];
    const expenseAccountData: AccountData[] = [];
    filteredData.forEach(f => {

      const accountData: AccountData = {
        accountName: f.accountName,
        balance: f.balance,
        accountType: f.accountType,
        normalType: f.normalType
      };

      // + credits, - debits
      // (debits in this case a expenses, and credits are revenue)
      if (f.normalType === NormalType.debit) {
        netIncome -= f.balance;
        expense += f.balance;

        expenseAccountData.push(accountData)
      }else {
        netIncome += f.balance;
        grossIncome += f.balance;
        incomeAccountData.push(accountData)
      }
    });

    return {
      netIncome: netIncome,
      grossIncome: grossIncome,
      totalExpense: expense,
      income: incomeAccountData,
      expense: expenseAccountData
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

    const accounts: { accountId: string; name: string, accountType: AccountType, normalType: NormalType, statementType: StatementType, balance: number }[] = accountSnapshot.docs
      .map(a => {
        const data = a.data() as AccountModel;

        return {
          accountId: data.accountId,
          name: data.accountName,
          accountType: data.accountType,
          normalType: data.normalType,
          balance: data.balance,
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

      const entries = entrySnapshot.docs.map(e => e.data() as AccountEntry);

      rawData.push({
        accountName: account.name,
        balance: account.balance,
        accountType: account.accountType,
        normalType: account.normalType,
        statementType: account.statementType,
        entries
      });
    }

    return rawData;
  }
}
