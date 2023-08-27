import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  
    formData: AuthenticationFormModel = {
      pageHeader: 'Sign In',
      actionButtonText: 'Sign In',
      actionAsync: async () => this.signInAction(),
      helperActionLeft: {
        actionText: 'Forgot Password',
        actionLink: '/users/forgotPassword'
      },
      helperActionRight: {
        actionText: 'New? Create Account',
        actionLink: '/users/signup'
      },
      form: this.formControls
    }

    ngOnInit(): void {
    
  }

  async signInAction(): Promise<void> {
    console.log(this.formData.form)
    // this.authService.login();
  }
}
