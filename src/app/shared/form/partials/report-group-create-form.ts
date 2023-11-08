import {StartEndDate} from "../../models/dates/start-end-date";

export interface ReportGroupCreateForm {
  reportGroupName: string,
  reportGroupDescription: string;
  dateRange: StartEndDate
}
