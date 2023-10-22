import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HelpComponent } from "./help/help.component";
import { UsersHelpPageComponent } from "./subpages/users-help-page/users-help-page.component";

const routes: Routes = [
  {
      path: '', 
      component: HelpComponent,
      title: 'Help | BitFinance'
  },
  {
      path: 'user-help-page',
      component: UsersHelpPageComponent,
      title: 'Users Help | BitFinance'
  },
  {
    path: 'account-help-page',
    component: UsersHelpPageComponent,
    title: 'Accounts Help | BitFinance'
  }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class HelpRoutingModule {}