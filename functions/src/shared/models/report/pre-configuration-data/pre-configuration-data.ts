import {PreConfiguredDataBalanceSheet} from "./balance-sheet/pre-configured-data-balance-sheet";
import {PreConfigurationDataTrialBalance} from "./trial-balance/pre-configuration-data-trial-balance";

export interface PreConfigurationData {
  balanceSheet: PreConfiguredDataBalanceSheet;
  trialBalance: PreConfigurationDataTrialBalance;
}
