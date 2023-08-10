import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersComponent } from './members/members.component';
import { MembersRoutingModule } from './members-routing.module';
import {SharedModule} from './../../shared/shared.module';
import { NavMemberTotalComponent } from './components/nav-member-total/nav-member-total.component'
import {MatDividerModule} from '@angular/material/divider'


@NgModule({
  declarations: [
    MembersComponent,
    NavMemberTotalComponent
  ],
  imports: [
    CommonModule,
    MembersRoutingModule,
    SharedModule,
    MatDividerModule
  ]
})
export class MembersModule { }
