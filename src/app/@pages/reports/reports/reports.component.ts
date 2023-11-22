import {Component, OnInit} from '@angular/core';
import {TopNavService} from "../../../shared/services/top-nav.service";
import {Roles} from "../../../shared/enums/authentication/roles";
import {DialogService} from "../../../shared/services/dialogs/dialog.service";
import {
  CreateReportGroupComponent
} from "../../../shared/components/dialogs/create-report-group/create-report-group.component";
import {ReportGroupCreateForm} from "../../../shared/form/partials/report-group-create-form";
import {ReportService} from "../../../shared/services/report/report.service";
import {CreateReportDto} from "../../../shared/models/reports/dto/create-report-dto";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit{

  constructor(private topNavService: TopNavService, private dialogService: DialogService, private reportService: ReportService) {
  }

  ngOnInit() {
    this.topNavService.setTopNav({
      topNavHeader: 'Reports',
      topNavAction: {
        icon: 'print_add',
        tooltip: 'Create Report Group',
        requiredRole: [Roles.manager, Roles.administrator],
        action: this.openReportGroupCreateModal.bind(this)
      },
      topNavIcon: 'print'
    })
  }

  /**
   * Opens the report.ts group creation modal
   */
  openReportGroupCreateModal() {
    this.dialogService.open(CreateReportGroupComponent, {
      title: 'Create Report Group',
      data: null,
      action: this.createReportGroup.bind(this)
    });
  }

  /**
   * Action to create a report.ts group
   * @param reportGroupForm Form used to create report.ts group
   */
  async createReportGroup(reportGroupForm: CreateReportDto) {
    await this.reportService.createReportGroup(reportGroupForm);
    await this.reportService.getReportList();
  }
}
