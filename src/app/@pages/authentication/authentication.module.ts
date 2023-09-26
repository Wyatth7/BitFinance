import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationRoutingModule } from './authentication-routing-module';
import { AuthenticationFormComponent } from './components/authentication-form/authentication-form.component';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input'
import {MatFormFieldModule} from '@angular/material/form-field';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component'
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    LoginComponent,
    AuthenticationFormComponent,
    ForgotPasswordComponent,
    SignUpComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatIconModule
  ]
})
export class AuthenticationModule { }
