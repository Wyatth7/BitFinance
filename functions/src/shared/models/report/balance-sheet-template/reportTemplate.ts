import {Section} from "./section";

export interface ReportTemplate {
  /**
   * The name of the report being shown.
   * Apple's is called "Condensed Consolidated Balance Sheets"
   */
  reportHeader: string;
  /**
   * A string of the date rage (in Angular long date format)
   */
  dateRange: string;
  sections: Section[];
}
