import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OverviewComponent } from "./overview/overview.component";

const routes: Routes = [
  {
      path: 'view', 
      component: OverviewComponent,
      title: 'Overview | City Gym'
  }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class OverviewRoutingModule {}