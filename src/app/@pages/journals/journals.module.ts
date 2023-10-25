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
import { SingleViewComponent } from './single-view/single-view.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { TransactionTableComponent } from './components/tables/transaction-table/transaction-table.component';
import { FileTableComponent } from './components/tables/file-table/file-table.component';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [
    JournalsComponent,
    ViewComponent,
    SingleViewComponent,
    TransactionTableComponent,
    FileTableComponent
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
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule
  ]
})
export class JournalsModule { }
