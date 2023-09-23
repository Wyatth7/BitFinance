import { AfterViewChecked, AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRole } from 'functions/src/shared/enums/user-role';
import { CreateUserModel } from 'src/app/shared/models/users/create-user-model';
import { passwordValidator, passwordsMatchValidator } from 'src/app/shared/form/validators/password-validator';
import { AuthenticationFormModel } from 'src/app/shared/models/members/form/authentication-form-model';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  constructor(private UserService: UserService, 
    private formBulider: FormBuilder) {
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
    }, {validators: passwordsMatchValidator}),
    securityQuestionAnswer: ['', Validators.required]
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

    const controls = this.formControls.value;

    const createUserModel: CreateUserModel = {
      firstName: controls.name?.firstName!,
      lastName: controls.name?.lastName!,
      email: controls.email!,
      password: controls.passwords?.password!,
      role: +UserRole.user,
      requested: true,
      securityQuestionAnswer: new Date()
    }

    await this.UserService.createUser(createUserModel);
  }

  get passwordControls():boolean {
    const passwordsGroup = this.formControls.get('passwords');
    return (passwordsGroup?.errors?.['passwordMatchError'] && passwordsGroup.get('confirmPassword')?.dirty);
  }
}
