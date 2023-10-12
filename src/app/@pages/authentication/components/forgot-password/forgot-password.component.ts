import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { passwordValidator } from 'src/app/shared/form/validators/password-validator';
import { AuthenticationFormModel } from 'src/app/shared/models/members/form/authentication-form-model';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  formControls = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required]],
    dateOfBirth: ['', [Validators.required]],
    password: new FormControl('', [Validators.required, passwordValidator()])
  });

  formData: AuthenticationFormModel = {
    pageHeader: 'Forgot Password',
    actionButtonText: 'Reset Password',
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
    const values = this.formControls.value;
    await this.authService.forgotPassword({
      email: values.email!,
      password: values.password!,
      dateOfBirth: values.dateOfBirth!,
      username: values.username!
    })


  }
}
