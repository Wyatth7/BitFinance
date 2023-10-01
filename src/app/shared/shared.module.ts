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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { NumberTextComponent } from './components/number-text/number-text.component';



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
    ContentLoadingScreenComponent,
    SearchBarComponent,
    NumberTextComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatSelectModule,
    MatSortModule
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
    ContentLoadingScreenComponent,
    NumberTextComponent
  ]
})
export class SharedModule { }
