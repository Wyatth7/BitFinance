import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/shared/models/users/user-model';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  user?: UserModel;
  initials = ''

  constructor(private _router: Router, 
    private _authenticationService: AuthenticationService) {}

  ngOnInit(): void {
      this.user = this._authenticationService.user
      this.initials = this.user?.firstName[0] + this.user?.lastName[0]!
  }

  logoutClicked(): void {
    this._authenticationService.logout()
    this._router.navigateByUrl('/auth/login')
  }
}
