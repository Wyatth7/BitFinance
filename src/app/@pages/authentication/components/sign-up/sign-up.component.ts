import { Component } from '@angular/core';
import { AuthenticationFormModel } from 'src/app/shared/models/members/form/authentication-form-model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  formData: AuthenticationFormModel = {
    pageHeader: 'Create Account',
    actionButtonText: 'Create Account',
    actionAsync: async () => this.signInAction(),
    helperActionLeft: {
      actionText: 'Have an Account? Login',
      actionLink: '/users/login'
    }
  }

  async signInAction(): Promise<void> {
    console.log('User Signed Up');
  }
}
