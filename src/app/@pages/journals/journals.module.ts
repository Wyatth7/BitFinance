import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalsComponent } from './journals/journals.component';
import { ViewComponent } from './view/view.component';
import { JournalsRoutingModule } from './journals-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    JournalsComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    JournalsRoutingModule,
    SharedModule
  ]
})
export class JournalsModule { }
