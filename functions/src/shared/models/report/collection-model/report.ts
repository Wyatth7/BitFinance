import {ReportDocuments} from "./reportDocuments";
import {ReportBase} from "./report-base";

export interface Report extends ReportBase{
  documents: ReportDocuments;
}
