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
import { EmptyTableInfoComponent } from './components/tables/empty-table-info/empty-table-info.component';
import { EmailUserComponent } from './components/dialogs/email-user/email-user.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { CreateJournalEntryDialogComponent } from './components/dialogs/create-journal-entry-dialog/create-journal-entry-dialog.component';
import { DebitCreditAccountFormComponent } from './components/dialogs/create-journal-entry-dialog/debit-credit-account-form/debit-credit-account-form.component';
import { MatTooltipModule } from '@angular/material/tooltip';


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
    EmptyTableInfoComponent,
    EmailUserComponent,
    CreateJournalEntryDialogComponent,
    DebitCreditAccountFormComponent,
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
    MatMenuModule,
    MatAutocompleteModule,
    MatTooltipModule
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
    InfoPageHeaderComponent,
    EmptyTableInfoComponent,
    EmailUserComponent
  ],
  providers: [
    TitleCasePipe
  ]
})
export class SharedModule { }
