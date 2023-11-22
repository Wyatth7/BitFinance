import {AccountData} from "../../models/report/pre-configuration-data/balance-sheet/account-data";
import {NormalType} from "../../enums/accounts/normal-type";
import {IncomeExpense} from "../../models/calculations/income-expense";
// import {RetainedEarningsSummary} from "../../models/report/collection-model/retained-earnings-summary";

export class ReportCalculations {

  /**
   * Generates gross income, net income, and expense
   * data from account data.
   * @param data Array of income statement account data
   */
  static incomeExpense(data: AccountData[]): IncomeExpense {
    const incomeExpense: IncomeExpense = {
      netIncome: 0,
      grossIncome: 0,
      expense: 0
    }
    for (const accountData of data) {
      const balance = !Array.isArray(accountData.balance) ? accountData.balance : accountData.balance[0];

      // + credits, - debits
      if (accountData.normalType === NormalType.debit) {
        incomeExpense.netIncome -= balance;
        incomeExpense.expense += balance;
      }else {
        incomeExpense.netIncome += balance;
        incomeExpense.grossIncome += balance;
      }
    }

    return incomeExpense;
  }

  static retainedEarnings() {

  }

}
