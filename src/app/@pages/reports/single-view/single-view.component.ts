import {Component, OnInit} from '@angular/core';
import {ReportService} from "../../../shared/services/report/report.service";
import {ReportDto} from "../../../shared/models/reports/dto/report-dto";
import {ActivatedRoute} from "@angular/router";
import {LoaderService} from "../../../shared/services/component-services/loader.service";
import {MatChipListboxChange} from "@angular/material/chips";
import {ReportType} from "../../../shared/enums/reports/report-type";
import {GetEnumValueService} from "../../../shared/services/enum/get-enum-value.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {DocumentsDto} from "../../../shared/models/reports/dto/documents-dto";
import {SafeDocuments} from "../../../shared/models/reports/safe-documents";
import {SnackBarService} from "../../../shared/services/component-services/snack-bar.service";
import {DialogService} from "../../../shared/services/dialogs/dialog.service";
import {EmailUserComponent} from "../../../shared/components/dialogs/email-user/email-user.component";

@Component({
  selector: 'app-single-view',
  templateUrl: './single-view.component.html',
  styleUrls: ['./single-view.component.scss']
})
export class SingleViewComponent implements OnInit{

  report?: ReportDto;

  pdf?: SafeResourceUrl;
  rawPdf?: string;

  selectedReport = ReportType.balanceSheet;

  sanitizedPdfs?: SafeDocuments;

  constructor(
    private reportService: ReportService,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    public getEnum: GetEnumValueService,
    private sanitizer: DomSanitizer,
    private notificationService: SnackBarService,
    private dialogService: DialogService
  ) { }

  async ngOnInit() {
    this.loaderService.showLoader('Report');
    const reportId = this.route.snapshot.url[0].path;

    this.report = await this.reportService.getReport(reportId);

    if (this.report) {
      this.sanitizePdfs();
    }

    if (this.sanitizedPdfs) {
      this.pdf = this.sanitizedPdfs.balanceSheet;
      this.rawPdf = this.report?.documents.balanceSheet;

    }

    this.loaderService.stopLoader();
  }

  async change($event: MatChipListboxChange){
    if($event.value === undefined){
      // this.renderEntryList = true;
      this.selectedReport = ReportType.balanceSheet
      return;
    }

    this.selectedReport = $event.value;

    if (!this.report || !this.sanitizedPdfs) return;

    switch ($event.value) {
      case ReportType.balanceSheet:
        this.pdf = this.sanitizedPdfs.balanceSheet;
        this.rawPdf = this.report.documents.balanceSheet;
        break;
      case ReportType.trialBalance:
        this.pdf = this.sanitizedPdfs.trialBalance;
        this.rawPdf = this.report.documents.trialBalance;
        break;
      case ReportType.incomeStatement:
        this.pdf = this.sanitizedPdfs.incomeStatement;
        this.rawPdf = this.report.documents.incomeStatement;
        break;
      case ReportType.retainedEarnings:
        this.pdf = this.sanitizedPdfs.retainedEarnings;
        this.rawPdf = this.report.documents.retainedEarnings;
        break;
      default:
        this.pdf = this.sanitizedPdfs.balanceSheet;
    }

  }

  private sanitizePdfs() {
    if (!this.report) return;

    this.sanitizedPdfs = {
      balanceSheet: this.sanitizer
        .bypassSecurityTrustResourceUrl(this.report.documents.balanceSheet),
      trialBalance: this.sanitizer
        .bypassSecurityTrustResourceUrl(this.report.documents.trialBalance),
      incomeStatement: this.sanitizer.bypassSecurityTrustResourceUrl(this.report.documents.incomeStatement),
      retainedEarnings: this.sanitizer.bypassSecurityTrustResourceUrl(this.report.documents.retainedEarnings)

    }
  }

  email() {

    this.dialogService.open(EmailUserComponent, {
      title: 'Email Report',
      data: {
        attachment: this.rawPdf
      }
    })
  }

  notify() {
    this.notificationService.showSuccess('Email sent');
  }
  notifyFn = this.notify.bind(this)
}
