import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';

import {MatCardModule} from '@angular/material/card';
import { CardComponent } from './components/cards/card/card.component';
import { MultiCardComponent } from './components/cards/multi-card/multi-card.component'
import { OverviewRoutingModule } from './overview-routing-module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'src/app/shared/shared.module';



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
    MatButtonModule,
    MatTooltipModule,
    SharedModule
  ]
})
export class OverviewModule { }
