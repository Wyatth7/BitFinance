import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationFormModel } from 'src/app/shared/models/members/form/authentication-form-model';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import { passwordValidator, passwordsMatchValidator } from 'src/app/shared/form/validators/password-validator';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  constructor(private authService: AuthenticationService,
    private formBuilder: FormBuilder) {
      this.formControls.get('passwords')?.setValidators(passwordsMatchValidator())
    }

  formControls = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]], 
    userName: [''],
    dob: [''],
    passwords: this.formBuilder.group({
      password: ['', [Validators.required, passwordValidator(), Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, passwordValidator(), Validators.minLength(8)]]
    }, {validators: passwordsMatchValidator})
  })

  formData: AuthenticationFormModel = {
    pageHeader: 'Forgot Password',
    actionButtonText: 'Validate Email, UserName, and Security Question',
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
      const userName = controls.userName.value || ''
      const dob = new Date(controls.dob.value!);
      const password = this.formControls.get('passwords')?.get('password')?.value;

      console.log(password);
      
  
      console.log(dob);

     await this.authService.forgotPassword(email, userName, dob);



  }
}
