import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'overview', 
    loadChildren: () => import('./@pages/overview/overview.module')
      .then(m => m.OverviewModule)
  },
  {
    path: 'members', 
    loadChildren: () => import('./@pages/members/members.module')
      .then(m => m.MembersModule)
  },
  {
    path: '', 
    redirectTo: '/overview/view', 
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
