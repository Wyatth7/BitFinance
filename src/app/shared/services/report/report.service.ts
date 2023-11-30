import { Injectable } from '@angular/core';
import {CreateReportDto} from "../../models/reports/dto/create-report-dto";
import {Functions, httpsCallable} from "@angular/fire/functions";
import {ReportFunctions} from "../../enums/firebase-functions/report-functions";
import {SnackBarService} from "../component-services/snack-bar.service";
import {ReportListDto} from "../../models/reports/dto/report-list-dto";
import {Subject} from "rxjs";
import {ReportDto} from "../../models/reports/dto/report-dto";

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  reports$ = new Subject<ReportListDto[]>();

  constructor(private functions: Functions, private snackbarService: SnackBarService) { }

  /**
   * Creates a report group for a date range
   * @param reportGroupForm form used to create a report group
   */
  async createReportGroup(reportGroupForm: CreateReportDto) {
    const createReportFunction = httpsCallable<CreateReportDto, null>(this.functions, ReportFunctions.generateReport);

    try {

      await createReportFunction(reportGroupForm);

      this.snackbarService.showSuccess('Report group created');
    }catch (err) {
      this.snackbarService.showError('Could not generate report group');
    }
  }

  /**
   * Gets list of all reports in the system
   */
  async getReportList() {
    const getReportListFunction = httpsCallable<null, { reports: ReportListDto[] }>(this.functions, ReportFunctions.getReportList);

    try {
      const reportList = await getReportListFunction();
      this.reports$.next(reportList.data.reports);
    }catch (e) {
      console.log(e)
    }
  }

  /**
   * Gets a single report
   * @param reportId ID of report to fetch
   */
  async getReport(reportId: string) {
    const getReportFunction = httpsCallable<string, { report: ReportDto }>(this.functions, ReportFunctions.getReport);

    try {
      const report = await getReportFunction(reportId)
      return report.data.report;
    }catch (e) {
      console.log(e)
      return;
    }
  }
}
