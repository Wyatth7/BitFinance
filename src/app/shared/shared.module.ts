import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondaryTopNavComponent } from './components/secondary-top-nav/secondary-top-nav.component';
import { UserCircleImageComponent } from './components/user/user-circle-image/user-circle-image.component';
import { RenderOnResizeDirective } from './directives/render-on-resize.directive';
import { RequiredRoleViewComponent } from './components/required-role-view/required-role-view.component';
import { TableComponent } from './components/tables/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TopNavService } from './services/top-nav.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    SecondaryTopNavComponent,
    UserCircleImageComponent,
    RenderOnResizeDirective,
    RequiredRoleViewComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatSnackBarModule
  ],
  exports: [
    SecondaryTopNavComponent,
    UserCircleImageComponent,
    RenderOnResizeDirective,
    RequiredRoleViewComponent,
    TableComponent,
  ]
})
export class SharedModule { }
