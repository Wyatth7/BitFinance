import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordValidator } from 'src/app/shared/form/validators/password-validator';
import { AuthenticationFormModel } from 'src/app/shared/models/members/form/authentication-form-model';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  
  
  constructor(private authService: AuthenticationService,
    private formBuilder: FormBuilder) {}
    
    formControls = this.formBuilder.group({
      email: ['', [ Validators.required, Validators.email,]],
      password: ['', [
        Validators.required,
        Validators.minLength(8), 
        passwordValidator()
      ]]
    })
  
    formData: AuthenticationFormModel = {
      pageHeader: 'Sign In',
      actionButtonText: 'Sign In',
      actionAsync: async () => this.signInAction(),
      helperActionLeft: {
        actionText: 'Forgot Password',
        actionLink: '/auth/forgotPassword'
      },
      helperActionRight: {
        actionText: 'New? Create Account',
        actionLink: '/auth/signup'
      },
      form: this.formControls
    }

    ngOnInit(): void {
    
  }

  async signInAction(): Promise<void> {
    console.log('form data' + this.formData.form)

    const controls = this.formControls.controls;
    
    const email = controls.email.value || "";
    const password = controls.password.value || "";

    this.authService.login(email, password);
  }
}
