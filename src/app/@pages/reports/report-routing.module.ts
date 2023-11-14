import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ReportsComponent} from "./reports/reports.component";
import {ViewComponent} from "./view/view.component";
import {SingleViewComponent} from "./single-view/single-view.component";

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,

    children: [
      {
        path: 'view',
        component: ViewComponent,
        title: 'Reports | BitFinance'
      },
      {
        path: ':id',
        component: SingleViewComponent,
        title: 'Report Group | BitFinance'
      },
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
