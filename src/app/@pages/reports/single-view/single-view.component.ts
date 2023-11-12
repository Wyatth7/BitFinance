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

@Component({
  selector: 'app-single-view',
  templateUrl: './single-view.component.html',
  styleUrls: ['./single-view.component.scss']
})
export class SingleViewComponent implements OnInit{

  report?: ReportDto;

  pdf?: SafeResourceUrl;

  selectedReport = ReportType.balanceSheet;

  sanitizedPdfs?: SafeDocuments;

  constructor(
    private reportService: ReportService,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    public getEnum: GetEnumValueService,
    private sanitizer: DomSanitizer
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
        break;
      case ReportType.trialBalance:
        this.pdf = this.sanitizedPdfs.trialBalance;
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
        .bypassSecurityTrustResourceUrl(this.report.documents.trialBalance)
    }
  }
}
