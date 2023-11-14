import {AccountData} from "./account-data";
import {BalanceSheetTotals} from "./balanceSheetTotals";

export interface PreConfiguredDataBalanceSheet {
  accountData: AccountData[];
  totals: BalanceSheetTotals;
}
