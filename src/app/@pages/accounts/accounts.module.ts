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
    MatButtonModule
  ]
})
export class AccountsModule { }
