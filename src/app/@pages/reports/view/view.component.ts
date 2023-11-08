import { Component } from '@angular/core';
import {ReportListDto} from "../../../shared/models/reports/dto/report-list-dto";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {

  reportGroups = reportGroupList;
  displayColumns = ['actions', 'reportGroupName', 'startDate', 'endDate', 'createdOn'];

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  navigateToReportGroup(reportGroupId: string) {
    this.router.navigate(['../', reportGroupId], {relativeTo: this.route})
      .then(r => r);
  }

}

const reportGroupList: ReportListDto[] = [
  {
    reportGroupId: 'assadf-asdfasd',
    reportGroupName: 'Q1 Reports',
    createdOn: new Date().toISOString(),
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
  },
  {
    reportGroupId: 'assadf-asdfasd',
    reportGroupName: 'Q2 Reports',
    createdOn: new Date().toISOString(),
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
  },
  {
    reportGroupId: 'assadf-asdfasd',
    reportGroupName: 'Q3 Reports',
    createdOn: new Date().toISOString(),
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
  },
  {
    reportGroupId: 'assadf-asdfasd',
    reportGroupName: 'Q4 Reports',
    createdOn: new Date().toISOString(),
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
  },
]
