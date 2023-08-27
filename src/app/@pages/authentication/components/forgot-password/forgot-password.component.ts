import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationFormModel } from 'src/app/shared/models/members/form/authentication-form-model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  constructor(private formBuilder: FormBuilder) {}

  formControls = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]]
  })

  formData: AuthenticationFormModel = {
    pageHeader: 'Forgot Password',
    actionButtonText: 'Send Password Reset Email',
    actionAsync: async () => this.forgotPasswordAction(),
    helperActionLeft: {
      actionText: 'Have an Account? Login',
      actionLink: '/users/login'
    },
    helperActionRight: {
      actionText: 'New? Create Account',
      actionLink: '/users/signup'
    },
    form: this.formControls
  }

  async forgotPasswordAction(): Promise<void> {
    console.log('Password Link Sent');
  }
}
