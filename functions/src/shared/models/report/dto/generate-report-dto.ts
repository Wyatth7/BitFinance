import {DateRange} from "../../time/date-range";

export interface GenerateReportDto {
  reportName: string;
  reportDescription: string;
  dateRange: DateRange;
}
