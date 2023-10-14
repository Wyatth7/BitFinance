import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalsComponent } from './journals/journals.component';
import { ViewComponent } from './view/view.component';
import { JournalsRoutingModule } from './journals-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    JournalsComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    JournalsRoutingModule,
    SharedModule,
    MatChipsModule,
    MatButtonModule,
    // Needed for using the app-table component
    MatSortModule,
    MatTableModule,
  ]
})
export class JournalsModule { }
