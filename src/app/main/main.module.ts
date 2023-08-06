import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { SideNavComponent } from './components/layout/navigation/side-nav/side-nav.component';

import {MatSidenavModule} from '@angular/material/sidenav'
import {MatButtonModule} from '@angular/material/button'
import {MatGridListModule} from '@angular/material/grid-list';
import { SideBarComponent } from './components/layout/side-bar/side-bar.component'
import { TopNavComponent } from './components/layout/navigation/top-nav/top-nav.component';


@NgModule({
  declarations: [
    LayoutComponent,
    SideNavComponent,
    SideBarComponent,
    TopNavComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatGridListModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class MainModule { }
