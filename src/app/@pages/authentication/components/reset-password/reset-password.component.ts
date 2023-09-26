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
    passwords: this.formBuilder.group({
      password: [
        '',
       [ Validators.required,
        Validators.minLength(8),
        passwordValidator()]
      ],
      confirmPassword: [
        '',
        [Validators.required,
        Validators.minLength(8),
        passwordValidator()]
      ],
    }, {validators: passwordsMatchValidator})
  })
  

  formData: AuthenticationFormModel = {
    pageHeader: 'Reset Password',
    actionButtonText: 'Reset Password',
    actionAsync: async () => this.resetPasswordAction(),
    helperActionLeft: {
      actionText: 'Have an Account? Login',
      actionLink: '/auth/login'
    },
    form: this.formControls
  }

  async resetPasswordAction(): Promise<void> {

    const controls = this.formControls.value;
    const password = controls.passwords?.password?.toString() || '';
    const confirmPassword = controls.passwords?.confirmPassword?.toString() || '';
    console.log(password);
    console.log(confirmPassword);
    
    await this.authService.resetPassword(password, confirmPassword)
    console.log('Your password has been reset');
  }

  get passwordControls():boolean {
    const passwordsGroup = this.formControls.get('passwords');
    return (passwordsGroup?.errors?.['passwordMatchError'] && passwordsGroup.get('confirmPassword')?.dirty);
  }
}
