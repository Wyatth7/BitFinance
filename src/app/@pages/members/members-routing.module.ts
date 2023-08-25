import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembersComponent } from './members/members.component';
import { requiredRoleGuard } from 'src/app/shared/activation-guards/required-role-guard';
import { Roles } from 'src/app/shared/enums/authentication/roles';

const routes: Routes = [
  {
    path: 'view', 
    component: MembersComponent, 
    canActivate: [requiredRoleGuard],
    data: {roles: [Roles.manager, Roles.administrator]}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule {}