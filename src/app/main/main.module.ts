import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

import {MatSidenavModule} from '@angular/material/sidenav'
import {MatButtonModule} from '@angular/material/button'
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu'
import {MatIconModule} from '@angular/material/icon'
import {MatDividerModule} from '@angular/material/divider';
import {MatTooltipModule} from '@angular/material/tooltip';

import { LayoutComponent } from './components/layout/layout.component';
import { SideNavComponent } from './components/layout/navigation/side-nav/side-nav.component';
import { SideBarComponent } from './components/layout/side-bar/side-bar.component'
import { TopNavComponent } from './components/layout/navigation/top-nav/top-nav.component';
import {NavLinkComponent} from './components/layout/navigation/nav-link/nav-link.component';
import { SecondaryTopNavComponent } from './components/layout/navigation/secondary-top-nav/secondary-top-nav.component';
import { AuthenticationComponent } from './components/authentication/authentication/authentication.component'


@NgModule({
  declarations: [
    LayoutComponent,
    SideNavComponent,
    SideBarComponent,
    TopNavComponent,
    NavLinkComponent,
    SecondaryTopNavComponent,
    AuthenticationComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    RouterModule,
    MatTooltipModule
  ],
  exports: [
    LayoutComponent,
    AuthenticationComponent
  ]
})
export class MainModule { }
