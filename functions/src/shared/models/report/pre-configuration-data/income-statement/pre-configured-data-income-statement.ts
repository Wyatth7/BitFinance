import {AccountData} from "../balance-sheet/account-data";

export interface PreConfiguredDataIncomeStatement {
  netIncome: number;
  grossIncome: number;
  totalExpense: number;
  income: AccountData[];
  expense: AccountData[];
}
