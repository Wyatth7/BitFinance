import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { ValueTextComponent } from './components/number-text/number-text.component';
import { CreateAccountDialogComponent } from './components/dialogs/create-account-dialog/create-account-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { InfoPageHeaderComponent } from './components/info-page-header/info-page-header.component';



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
    ValueTextComponent,
    CreateAccountDialogComponent,
    InfoPageHeaderComponent,
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
    MatSortModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule
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
    ValueTextComponent,
    InfoPageHeaderComponent
  ],
  providers: [
    TitleCasePipe
  ]
})
export class SharedModule { }
