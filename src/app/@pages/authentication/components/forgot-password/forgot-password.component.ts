import { Component } from '@angular/core';
import { AuthenticationFormModel } from 'src/app/shared/models/members/form/authentication-form-model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  formData: AuthenticationFormModel = {
    pageHeader: 'Forgot Password',
    actionButtonText: 'Send Password Reset Email',
    actionAsync: async () => this.signInAction(),
    helperActionLeft: {
      actionText: 'Have an Account? Login',
      actionLink: '/users/login'
    },
    helperActionRight: {
      actionText: 'New? Create Account',
      actionLink: '/users/signup'
    },
    form: {}
  }

  async signInAction(): Promise<void> {
    console.log('Password Link Sent');
  }
}
