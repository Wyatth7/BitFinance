import {ReportDocuments} from "./reportDocuments";
import {ReportBase} from "./report-base";
import {RetainedEarningsSummary} from "./retained-earnings-summary";

export interface Report extends ReportBase{
  documents: ReportDocuments;
  retainedEarningsSummary?: RetainedEarningsSummary;
}
