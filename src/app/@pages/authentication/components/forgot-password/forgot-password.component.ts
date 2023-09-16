import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationFormModel } from 'src/app/shared/models/members/form/authentication-form-model';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  constructor(private authService: AuthenticationService,
    private formBuilder: FormBuilder) {}

  formControls = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]], 
    userId: ['']
  })

  formData: AuthenticationFormModel = {
    pageHeader: 'Forgot Password',
    actionButtonText: 'Validate Email and User-Id',
    actionAsync: async () => this.forgotPasswordAction(),
    helperActionLeft: {
      actionText: 'Have an Account? Login',
      actionLink: '/auth/login'
    },
    helperActionRight: {
      actionText: 'New? Create Account',
      actionLink: '/auth/signup'
    },
    form: this.formControls
  }

  async forgotPasswordAction(): Promise<void> {
    console.log('Password Link Sent');

    const controls = this.formControls.controls
    const email = controls.email.value || ''
    const userId = controls.userId.value || ''

    await this.authService.resetPassword(email, userId)

    console.log('Done');
    
    


  }
}
