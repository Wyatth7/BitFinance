import {ReportDocuments} from "./reportDocuments";

export interface Report {
  generatedOn: string;
  reportName: string;
  reportDescription: string;
  documents: ReportDocuments;
}
