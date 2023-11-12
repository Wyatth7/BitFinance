import {Component, OnInit} from '@angular/core';
import {ReportService} from "../../../shared/services/report/report.service";
import {ReportDto} from "../../../shared/models/reports/dto/report-dto";
import {ActivatedRoute} from "@angular/router";
import {LoaderService} from "../../../shared/services/component-services/loader.service";
import {MatChipListboxChange} from "@angular/material/chips";
import {ReportType} from "../../../shared/enums/reports/report-type";
import {GetEnumValueService} from "../../../shared/services/enum/get-enum-value.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-single-view',
  templateUrl: './single-view.component.html',
  styleUrls: ['./single-view.component.scss']
})
export class SingleViewComponent implements OnInit{

  report?: ReportDto;

  pdf?: string;

  selectedReport = ReportType.balanceSheet;

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
      this.pdf = this.report.documents.balanceSheet;
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

    switch ($event.value) {
      case ReportType.balanceSheet:
        this.pdf = this.report?.documents.balanceSheet;
        break;
      case ReportType.trialBalance:
        this.pdf = this.report?.documents.trialBalance;
        break;
      default:
        this.pdf = this.report?.documents.balanceSheet;
    }

  }

  photoUrl(){
    if (!this.pdf) return '';

    return this.sanitizer.bypassSecurityTrustResourceUrl(this.pdf);
  }
}
