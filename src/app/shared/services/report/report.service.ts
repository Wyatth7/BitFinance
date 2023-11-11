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
    const createReportFunction = httpsCallable<CreateReportDto, null>(this.functions, ReportFunctions.generateReport);

    try {

      await createReportFunction(reportGroupForm);

      this.snackbarService.showSuccess('Report group created');
    }catch (err) {
      this.snackbarService.showError('Could not generate report group');
    }
  }
}
