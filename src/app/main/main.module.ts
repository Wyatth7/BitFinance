import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { SideNavComponent } from './components/layout/navigation/side-nav/side-nav.component';
import { SideBarComponent } from './components/layout/side-bar/side-bar.component'
import { TopNavComponent } from './components/layout/navigation/top-nav/top-nav.component';

import {MatSidenavModule} from '@angular/material/sidenav'
import {MatButtonModule} from '@angular/material/button'
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu'
import {MatIconModule} from '@angular/material/icon'
import {MatDividerModule} from '@angular/material/divider';
import {RouterModule} from '@angular/router';

import {NavLinkComponent} from './components/layout/navigation/nav-link/nav-link.component';
import { SecondaryTopNavComponent } from './components/layout/navigation/secondary-top-nav/secondary-top-nav.component'


@NgModule({
  declarations: [
    LayoutComponent,
    SideNavComponent,
    SideBarComponent,
    TopNavComponent,
    NavLinkComponent,
    SecondaryTopNavComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    RouterModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class MainModule { }
