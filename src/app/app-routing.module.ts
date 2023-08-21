import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'overview', 
    loadChildren: () => import('./@pages/overview/overview.module')
      .then(o => o.OverviewModule)
  },
  {
    path: 'members', 
    loadChildren: () => import('./@pages/members/members.module')
      .then(m => m.MembersModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./@pages/authentication/authentication.module')
      .then(a => a.AuthenticationModule)
  },
  {
    path: 'login',
    redirectTo: 'users/login',
    pathMatch: 'full'
  },
  {
    path: '', 
    redirectTo: '/overview/view', 
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/overview/view',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
