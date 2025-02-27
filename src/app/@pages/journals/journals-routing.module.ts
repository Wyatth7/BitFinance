import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JournalsComponent } from './journals/journals.component';
import { ViewComponent } from './view/view.component';
import { SingleViewComponent } from './single-view/single-view.component';

const routes: Routes = [
  {
    path: '',
    component: JournalsComponent,
    children: [
      {
        path: 'view',
        component: ViewComponent,
        title: 'Journal | BitFinance'
      },
      {
        path: ':id',
        component: SingleViewComponent,
        title: 'Entry | BitFinance'
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JournalsRoutingModule { }
