import {Component, OnInit} from '@angular/core';
import {ReportListDto} from "../../../shared/models/reports/dto/report-list-dto";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ReportService} from "../../../shared/services/report/report.service";
import {LoaderService} from "../../../shared/services/component-services/loader.service";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit{

  displayColumns = ['actions', 'reportName', 'start', 'end', 'generatedOn'];

  reports?: ReportListDto[];
  private _reportListSubscription!: Subscription;

  constructor(private reportService: ReportService, private router: Router, private route: ActivatedRoute, private loaderService: LoaderService) {
  }

  async ngOnInit() {
    this._reportListSubscription = this.reportService.reports$
      .subscribe(reports => this.reports = reports);

    if (!this.reports) {
      this.loaderService.showLoader('Reports');

      await this.reportService.getReportList();

      this.loaderService.stopLoader();
    }
  }

  navigateToReportGroup(reportGroupId: string) {
    this.router.navigate(['../', reportGroupId], {relativeTo: this.route})
      .then(r => r);
  }

}
