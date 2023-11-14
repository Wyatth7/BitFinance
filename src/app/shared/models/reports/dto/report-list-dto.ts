export interface ReportListDto {
  reportId: string;
  reportName: string;
  reportDescription: string;
  generatedOn: string;
  dateRange: {
    start: string,
    end: string
  }
}
