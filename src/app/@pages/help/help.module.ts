import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpRoutingModule } from './help-routing-module';
import { HelpComponent } from './help/help.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { UsersHelpPageComponent } from './subpages/users-help-page/users-help-page.component';
import { AccountsHelpPageComponent } from './subpages/accounts-help-page/accounts-help-page.component';
import {CdkAccordionModule} from '@angular/cdk/accordion';



@NgModule({
  declarations: [
    HelpComponent,
    UsersHelpPageComponent,
    AccountsHelpPageComponent
  ],
  imports: [
    CommonModule,
    HelpRoutingModule,
    MatTabsModule,
    MatDividerModule,
    CdkAccordionModule
  ]
})
export class HelpModule { }
