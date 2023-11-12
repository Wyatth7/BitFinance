import {AccountData} from "../balance-sheet/account-data";

export interface PreConfigurationDataTrialBalance {
  accountData: AccountData[],
  totalCredits: number;
  totalDebits: number;
}
