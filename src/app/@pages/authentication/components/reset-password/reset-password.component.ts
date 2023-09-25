import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordValidator, passwordsMatchValidator } from 'src/app/shared/form/validators/password-validator';
import { AuthenticationFormModel } from 'src/app/shared/models/members/form/authentication-form-model';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  constructor(private authService: AuthenticationService,
    private formBuilder: FormBuilder) {   
      this.formControls.get('passwords')?.setValidators(passwordsMatchValidator())
    }

  formControls = this.formBuilder.group({
    password: ['', 
    Validators.required,
    Validators.minLength(8),
    passwordValidator()],
    confirmPassword: ["",
    Validators.required,
    Validators.minLength(8),
    passwordValidator()]
  })

  formData: AuthenticationFormModel = {
    pageHeader: 'Reset Password',
    actionButtonText: 'Reset Password',
    actionAsync: async () => this.resetPasswordAction(),
    helperActionLeft: {
      actionText: 'Have an Account? Login',
      actionLink: '/auth/login'
    },
    form: {}
  }

  async resetPasswordAction(): Promise<void> {
    const auth = this.authService;
    const user = auth.user
    console.log(user?.lastName);
    
    await this.authService.resetPassword
    console.log('Your password has been reset');
  }
}
