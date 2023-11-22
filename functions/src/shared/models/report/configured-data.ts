import {ReportTemplate} from "./report-template/reportTemplate";

export interface ConfiguredData {
  balanceSheet: ReportTemplate;
  trialBalance: ReportTemplate;
  incomeStatement: ReportTemplate;
  retainedEarnings: ReportTemplate;
}
