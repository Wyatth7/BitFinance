import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {

  constructor(private _router: Router, 
    private _authenticationService: AuthenticationService) {}

  logoutClicked(): void {
    this._authenticationService.toggleAuthenticated();
    this._router.navigateByUrl('/users/login')
  }
}
