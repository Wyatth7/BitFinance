import { Component, OnInit } from '@angular/core';
import { AuthenticationFormModel } from 'src/app/shared/models/members/form/authentication-form-model';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
    }
  }

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    
  }

  async signInAction(): Promise<void> {
    this.authService.login();
  }
}
