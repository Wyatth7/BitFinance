import { AfterViewChecked, AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordValidator, passwordsMatchValidator } from 'src/app/shared/form/validators/password-validator';
import { AuthenticationFormModel } from 'src/app/shared/models/members/form/authentication-form-model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  constructor(private formBulider: FormBuilder) {
    this.formControls.get('passwords')?.setValidators(passwordsMatchValidator())
  }

  formControls = this.formBulider.group({
    name: this.formBulider.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]]
    }),
    email: ['', [Validators.required, Validators.email]],
    passwords: this.formBulider.group({
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
    pageHeader: 'Create Account',
    actionButtonText: 'Create Account',
    actionAsync: async () => this.signUpAction(),
    helperActionLeft: {
      actionText: 'Have an Account? Login',
      actionLink: '/auth/login'
    },
    form: this.formControls
  }

  async signUpAction(): Promise<void> {
    console.log(this.formControls);
  }

  get passwordControls():boolean {
    const passwordsGroup = this.formControls.get('passwords');
    return (passwordsGroup?.errors?.['passwordMatchError'] && passwordsGroup.get('confirmPassword')?.dirty);
  }
}
