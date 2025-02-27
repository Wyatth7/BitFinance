import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: 'login', 
    component: LoginComponent, 
    title: 'Login | BitFinance'
  },
  {
    path: 'signup',
    component: SignUpComponent, 
    title: 'Sign Up | BitFinance'
  },
  {
    path: 'forgotPassword', 
    component: ForgotPasswordComponent, 
    title: 'Forgot Password | BitFinance'
  },
  {
    path: 'resetPassword',
    component: ResetPasswordComponent,
    title: 'Reset Password | BitFinance'
  },
  {path: '**', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {}