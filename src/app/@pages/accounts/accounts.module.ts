import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsComponent } from './accounts/accounts.component';
import { ViewComponent } from './view/view.component';
import { AccountsRoutingModule } from './accounts-routing-module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    AccountsComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    SharedModule
  ]
})
export class AccountsModule { }
