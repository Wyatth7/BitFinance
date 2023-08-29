import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';

import {MatCardModule} from '@angular/material/card';
import { CardComponent } from './components/cards/card/card.component';
import { MultiCardComponent } from './components/cards/multi-card/multi-card.component'
import { OverviewRoutingModule } from './overview-routing-module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    OverviewComponent,
    CardComponent,
    MultiCardComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    OverviewRoutingModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class OverviewModule { }
