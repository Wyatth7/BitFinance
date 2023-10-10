import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountsComponent } from "./accounts/accounts.component";
import { ViewComponent } from "./view/view.component";
import { SingleViewComponent } from "./single-view/single-view.component";

const routes: Routes = [
  {
    path: '',
    component: AccountsComponent,
    children: [
      {
        path: 'view', 
        component: ViewComponent,
        title: 'Accounts | BitFinance'
      },
      {
        path: ':id',
        component: SingleViewComponent,
        title: 'Account | BitFinance'
      }
    ]
  }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AccountsRoutingModule {}