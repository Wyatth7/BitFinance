import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './members/members.component';
import { MembersRoutingModule } from './members-routing.module';
import {SharedModule} from './../../shared/shared.module';
import { NavMemberTotalComponent } from './components/nav-member-total/nav-member-total.component'
import {MatDividerModule} from '@angular/material/divider'
import {MatSelectModule} from '@angular/material/select';
import { SecondaryNavComponent } from './components/secondary-nav/secondary-nav.component'
import { MatTableModule } from '@angular/material/table'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatChipsModule} from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MemberTableComponent } from './components/tables/member-table/member-table.component';
import { RequestedMemberTableComponent } from './components/tables/requested-member-table/requested-member-table.component';
import { CreateEditUserComponent } from './components/create-edit-user/create-edit-user.component';


@NgModule({
  declarations: [
    UsersComponent,
    NavMemberTotalComponent,
    SecondaryNavComponent,
    MemberTableComponent,
    RequestedMemberTableComponent,
    CreateEditUserComponent
  ],
  imports: [
    CommonModule,
    MembersRoutingModule,
    SharedModule,
    MatDividerModule,
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatChipsModule,
    MatTooltipModule
  ]
})
export class MembersModule { }
