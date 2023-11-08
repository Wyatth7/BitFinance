import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports/reports.component';
import { ViewComponent } from './view/view.component';
import { SingleViewComponent } from './single-view/single-view.component';
import {ReportRoutingModule} from "./report-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";



@NgModule({
  declarations: [
    ReportsComponent,
    ViewComponent,
    SingleViewComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    SharedModule,
    MatSortModule,
    MatTableModule,
    MatButtonModule,
    MatTooltipModule
  ]
})
export class ReportsModule { }
