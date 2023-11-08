import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports/reports.component';
import { ViewComponent } from './view/view.component';
import { SingleViewComponent } from './single-view/single-view.component';
import {ReportRoutingModule} from "./report-routing.module";
import {SharedModule} from "../../shared/shared.module";



@NgModule({
  declarations: [
    ReportsComponent,
    ViewComponent,
    SingleViewComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    SharedModule
  ]
})
export class ReportsModule { }
