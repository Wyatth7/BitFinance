import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountsComponent } from "./accounts/accounts.component";
import { ViewComponent } from "./view/view.component";

const routes: Routes = [
  {
    path: '',
    component: AccountsComponent,
    children: [
      {
        path: 'view', 
        component: ViewComponent,
        title: 'Accounts | BitFinance'
    }
    ]
  }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AccountsRoutingModule {}