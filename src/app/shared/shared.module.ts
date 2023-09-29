import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondaryTopNavComponent } from './components/secondary-top-nav/secondary-top-nav.component';
import { UserCircleImageComponent } from './components/user/user-circle-image/user-circle-image.component';
import { RenderOnResizeDirective } from './directives/render-on-resize.directive';
import { RequiredRoleViewComponent } from './components/required-role-view/required-role-view.component';
import { TableComponent } from './components/tables/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ErrorComponent } from './components/dialogs/error/error.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SpinnerButtonComponent } from './components/buttons/spinner-button/spinner-button.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { ContentLoadingScreenComponent } from './components/spinners-loader/content-loading-screen/content-loading-screen.component';
import { MatDividerModule } from '@angular/material/divider';



@NgModule({
  declarations: [
    SecondaryTopNavComponent,
    UserCircleImageComponent,
    RenderOnResizeDirective,
    RequiredRoleViewComponent,
    TableComponent,
    ErrorComponent,
    SpinnerButtonComponent,
    EllipsisPipe,
    ContentLoadingScreenComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDividerModule
  ],
  exports: [
    SecondaryTopNavComponent,
    UserCircleImageComponent,
    RenderOnResizeDirective,
    RequiredRoleViewComponent,
    TableComponent,
    ErrorComponent,
    SpinnerButtonComponent,
    EllipsisPipe,
    ContentLoadingScreenComponent
  ]
})
export class SharedModule { }
