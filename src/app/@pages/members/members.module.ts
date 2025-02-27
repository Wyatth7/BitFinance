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
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CreateUserComponent } from './create-user/create-user.component';
import { ViewComponent } from './view/view.component';
import { EditUserComponent } from './user-info/edit-user/edit-user.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { AdvancedComponent } from './user-info/advanced/advanced.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import { MessageComponent } from './user-info/message/message.component';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    UsersComponent,
    NavMemberTotalComponent,
    SecondaryNavComponent,
    MemberTableComponent,
    RequestedMemberTableComponent,
    CreateEditUserComponent,
    CreateUserComponent,
    EditUserComponent,
    ViewComponent,
    UserInfoComponent,
    AdvancedComponent,
    MessageComponent
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
    MatTooltipModule,
    MatCardModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatSortModule
  ],
  providers: [
    MatDatepickerModule
  ]
})
export class MembersModule { }
