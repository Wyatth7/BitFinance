import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs'
import { Roles } from '../../enums/authentication/roles';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated$ = new BehaviorSubject<boolean>(false);
  private _isAuthenticated = false;

  // token and roles come from login and should be saved to local storage.
  private _userToken: string = '';
  private _userRole: Roles = 4;

  public get isAuthenticated() {
    return this._isAuthenticated;
  }

  public get userToken() {
    return this._userToken;
  }

  public get userRole() {
    return this._userRole;
  }

  constructor() {
    this.toggleAuthenticated(false);
   }

  // This will call a login API
  // If login, set role and auth status
  login() {
    this.toggleAuthenticated(true);
    this._userRole = 1;
  }

  /**
   * Toggles a user's authentication status
   * @param shouldActivate Whether a user should be authenticated or not.
   */
  toggleAuthenticated(shouldActivate = false) {
    this.isAuthenticated$.next(shouldActivate);
    this._isAuthenticated = shouldActivate;
  }

  /**
   * Validates that a user's token is true
   * @returns boolean that states the validity of a token
   */
  validateToken(): boolean {
    return true
  }

  /**
   * Checks login status of a user, and updates auth status accordingly.
   * @returns boolean stating the login status of a user
   */
  checkTokenStatus(): boolean {
    // check token exp/validity/exisits here

    // update isAuthenticated observable as needed

    // if valid token, return true
    this.toggleAuthenticated(false);
    return false;
    
    // if invalid token, return false; clear token
  }
}
