import {StartEndDate} from "../../dates/start-end-date";
import {DateRange} from "../../time/DateRange";

export interface CreateReportDto {
  reportName: string;
  reportDescription?: string;
  dateRange: DateRange
}
