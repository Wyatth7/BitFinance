import { Injectable } from '@angular/core';
import {ReportGroupCreateForm} from "../../form/partials/report-group-create-form";
import {CreateReportDto} from "../../models/reports/dto/create-report-dto";
import {Functions, httpsCallable} from "@angular/fire/functions";
import {ReportFunctions} from "../../enums/firebase-functions/report-functions";
import {SnackBarService} from "../component-services/snack-bar.service";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private functions: Functions, private snackbarService: SnackBarService) { }

  async createReportGroup(reportGroupForm: CreateReportDto) {
    const createReportFunction = httpsCallable<CreateReportDto, { report: string }>(this.functions, ReportFunctions.generateReport);

    try {

      const base64String = await createReportFunction(reportGroupForm);

        const a = document.createElement("a"); //Create <a>
        a.href = base64String.data.report; //Image Base64 Goes here
        a.download = 'test-balance-sheet.pdf'; //File name Here
        a.click(); //Downloaded file
        a.remove();

      this.snackbarService.showSuccess('Report group created');
    }catch (err) {
      this.snackbarService.showError('Could not generate report group');
    }
  }
}
