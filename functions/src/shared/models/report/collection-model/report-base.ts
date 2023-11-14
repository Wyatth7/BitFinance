import {DateRange} from "../../time/date-range";

export interface ReportBase {
  generatedOn: string;
  reportName: string;
  reportDescription: string;
  dateRange: DateRange;
  reportId: string;
}
