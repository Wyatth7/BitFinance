import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsComponent } from './accounts/accounts.component';
import { ViewComponent } from './view/view.component';
import { AccountsRoutingModule } from './accounts-routing-module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { SingleViewComponent } from './single-view/single-view.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';



@NgModule({
  declarations: [
    AccountsComponent,
    ViewComponent,
    SingleViewComponent
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    SharedModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatDividerModule,
    MatTooltipModule,
    MatIconModule,
    MatMenuModule,
    MatChipsModule
  ]
})
export class AccountsModule { }
