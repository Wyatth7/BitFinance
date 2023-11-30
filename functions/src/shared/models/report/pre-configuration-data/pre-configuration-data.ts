import {PreConfiguredDataBalanceSheet} from "./balance-sheet/pre-configured-data-balance-sheet";
import {PreConfigurationDataTrialBalance} from "./trial-balance/pre-configuration-data-trial-balance";
import {PreConfiguredDataIncomeStatement} from "./income-statement/pre-configured-data-income-statement";
import {PreConfiguredDataRetainedEarnings} from "./retained-earnings/pre-configured-data-retained-earnings";

export interface PreConfigurationData {
  balanceSheet: PreConfiguredDataBalanceSheet;
  trialBalance: PreConfigurationDataTrialBalance;
  incomeStatement: PreConfiguredDataIncomeStatement;
  retainedEarnings: PreConfiguredDataRetainedEarnings;
}
