import { Component } from '@angular/core';
import { AuthenticationFormModel } from 'src/app/shared/models/members/form/authentication-form-model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  formData: AuthenticationFormModel = {
    pageHeader: 'Reset Password',
    actionButtonText: 'Reset Password',
    actionAsync: async () => this.resetPasswordAction(),
    helperActionLeft: {
      actionText: 'Have an Account? Login',
      actionLink: '/users/login'
    },
    form: {}
  }

  async resetPasswordAction(): Promise<void> {
    console.log('Your password has been reset');
  }
}
