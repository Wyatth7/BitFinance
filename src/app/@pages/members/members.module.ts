import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersComponent } from './members/members.component';
import { MembersRoutingModule } from './members-routing.module';
import {SharedModule} from './../../shared/shared.module';
import { NavMemberTotalComponent } from './components/nav-member-total/nav-member-total.component'
import {MatDividerModule} from '@angular/material/divider'
import {MatSelectModule} from '@angular/material/select';
import { SecondaryNavComponent } from './components/secondary-nav/secondary-nav.component'

@NgModule({
  declarations: [
    MembersComponent,
    NavMemberTotalComponent,
    SecondaryNavComponent
  ],
  imports: [
    CommonModule,
    MembersRoutingModule,
    SharedModule,
    MatDividerModule,
    MatSelectModule
  ]
})
export class MembersModule { }
