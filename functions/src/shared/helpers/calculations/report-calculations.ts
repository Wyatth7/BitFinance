import {AccountData} from "../../models/report/pre-configuration-data/balance-sheet/account-data";
import {NormalType} from "../../enums/accounts/normal-type";
import {IncomeExpense} from "../../models/calculations/income-expense";
import {AccountModel} from "../../models/accounts/account-model";
import {BalanceTotalsModel} from "../../models/accounts/responses/balance-totals-model";
import {AccountType} from "../../models/enums/account-type";

/**
 * Calculates general financial report data to be used for
 * reporting documents or page headers
 */
export class ReportCalculations {

  /**
   * Generates gross income, net income, and expense
   * data from account data.
   * @param data Array of income statement account data
   */
  static incomeExpense(data: AccountData[] | AccountModel[]): IncomeExpense {
    const incomeExpense: IncomeExpense = {
      netIncome: 0,
      grossIncome: 0,
      expense: 0
    }
    for (const accountData of data) {
          const balance = !Array.isArray(accountData.balance) ? accountData.balance : accountData.balance[0];

          // + credits, - debits
          if (accountData.normalType === NormalType.debit) {
            incomeExpense.netIncome += balance;
            incomeExpense.expense += balance;
          }else {
            incomeExpense.netIncome += balance;
            incomeExpense.grossIncome += balance;
      }
    }

    return incomeExpense;
  }

  /**
   * Gets the ending balance of retained earnings
   * @param beginningEarnings last reports ending earnings
   * @param netIncome this reports net income; Can be negative
   * @param dividends this reports dividends
   */
  static retainedEarnings(beginningEarnings: number, netIncome: number, dividends: number) {
    return beginningEarnings + netIncome - dividends;
  }

  /**
   * Gets
   */
  static balanceSheet(accounts: AccountModel[]): BalanceTotalsModel {
    const balances: BalanceTotalsModel = {
      asset: 0,
      liability: 0,
      equity: 0,
    }

    for (const account of accounts) {
      if (account.accountName.toLowerCase().trim() === 'inventory')
        balances.averageInventory = account.balance / 2;
      if (account.accountName.toLowerCase().trim() === 'accounts receivable') {
        balances.averageAccountsReceivable = account.balance / 2;
        balances.accountsReceivable = account.balance;
      }

      if (account.accountName.toLowerCase().trim() === 'cash')
        balances.cash = account.balance

      switch (account.accountType) {
        case AccountType.asset:
          balances.asset += account.balance
          break;
        case AccountType.liability:
          balances.liability += account.balance
          break;
        case AccountType.equity:
          balances.equity += account.balance
          break;
        default:
          break;
      }
    }

    balances.averageTotalAsset = balances.asset / 2;
    balances.averageTotalEquity = balances.equity / 2;

    return balances;
  }
}
