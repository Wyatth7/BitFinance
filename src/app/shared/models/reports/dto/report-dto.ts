import {ReportListDto} from "./report-list-dto";
import {DocumentsDto} from "./documents-dto";

export interface ReportDto extends ReportListDto {
  documents: DocumentsDto;
}
