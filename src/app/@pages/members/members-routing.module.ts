import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './members/members.component';
import { requiredRoleGuard } from 'src/app/shared/activation-guards/required-role-guard';
import { Roles } from 'src/app/shared/enums/authentication/roles';
import { CreateEditUserComponent } from './components/create-edit-user/create-edit-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    canActivate: [requiredRoleGuard],
    title: 'Users | City Gym',
    data: {roles: [Roles.administrator]},
    children: [
      {
        path: 'view', 
        component: ViewComponent, 
        canActivate: [requiredRoleGuard],
        title: 'Users | City Gym',
        data: {roles: [Roles.administrator]}
      },
      {
        path: 'create',
        component: CreateUserComponent,
        canActivate: [requiredRoleGuard],
        title: 'Create User | ',
        data: {roles: [Roles.administrator]}
      },
      {
        path: 'edit/:userId',
        component: EditUserComponent,
        canActivate: [requiredRoleGuard],
        title: 'Edit User | ',
        data: {roles: [Roles.administrator]}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule {}