import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuardChild } from './shared/activation-guards/auth-guard';
import { accessLoginPageGuard } from './shared/activation-guards/auth-pages-guard';

const routes: Routes = [
  {
    path: 'overview', 
    loadChildren: () => import('./@pages/overview/overview.module')
      .then(o => o.OverviewModule),
    canActivateChild: [authGuardChild]
  },
  {
    path: 'users', 
    loadChildren: () => import('./@pages/members/members.module')
      .then(m => m.MembersModule),
    canActivateChild: [authGuardChild]
  },
  {
    path: 'auth',
    loadChildren: () => import('./@pages/authentication/authentication.module')
      .then(a => a.AuthenticationModule),
    canActivateChild: [accessLoginPageGuard]
  },
  {
    path: 'login',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
