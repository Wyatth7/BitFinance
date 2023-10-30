import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs'
import { Roles } from '../../enums/authentication/roles';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Functions } from '@angular/fire/functions';
import { httpsCallable } from 'firebase/functions';
import { UserFunctions } from '../../enums/firebase-functions/user-functions';
import { UserModel } from '../../models/users/user-model';
import { CreateUserModel } from '../../models/users/create-user-model';
import { SnackBarService } from '../component-services/snack-bar.service';
import { ForgotPasswordForm } from '../../models/users/forgot-password-form';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated$ = new BehaviorSubject<boolean>(false);
  private _isAuthenticated = false;

  // token and roles come from login and should be saved to local storage.
  private _user?: UserModel;
  private _userRole: Roles = Roles.administrator;
  private _userToken: string | undefined = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjAzZDA3YmJjM2Q3NWM2OTQyNzUxMGY2MTc0ZWIyZjE2NTQ3ZDRhN2QiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiV3lhdHQgSGFyZGluIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2FjY291bnRpbmctYXBwLXRlc3QiLCJhdWQiOiJhY2NvdW50aW5nLWFwcC10ZXN0IiwiYXV0aF90aW1lIjoxNjk4MTg1NDUzLCJ1c2VyX2lkIjoiQ0lkSDNvOVNsRU45em9veWhJalNsMm1wUVlNMiIsInN1YiI6IkNJZEgzbzlTbEVOOXpvb3loSWpTbDJtcFFZTTIiLCJpYXQiOjE2OTgxODU0NTMsImV4cCI6MTY5ODE4OTA1MywiZW1haWwiOiJ3aGFyZGluMTAxMEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ3aGFyZGluMTAxMEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.NwU7TGR4xr-QB5c0qD7xOlhNAaNNG8x4JnI4b7OC7sPaFaXMdTyq6ufA5JQ5HI-qi3UAEtcZWU-tVUD-X6XaYyAPcQnbZuhV-as4daV3ofjoicMne99f-RoOVVdhQRYGtEv5EAlDSBDQVqWeC05AQZyFeoB_XCOO5cOfhLBnENk7pcmYSWnCPpo0IJI9LVotWYCLTRSGEsNViaCe7fpu_Sw0O3Ygehbtog_YlNI4ixz_ycRYvO31RtFoSVal6lY_3s6iB6xtbk4X2W9VQnUR1tzs43GAGCC16qQ86oLvjNJKVlTeOCEyOFO2ZIfS1kaH5qR9lkgczx07v1ypfplv-g';

  public get isAuthenticated() {
    return this._isAuthenticated;
  }

  public get user() {
    return this._user;
  }

  public get userRole(): Roles {
    return this._userRole;
  }

  constructor(private router: Router,
    private auth: Auth,
    private functions: Functions,
    private _snackBarService: SnackBarService) {}

  // This will call a login API
  // If login, set role and auth status
  async login(email: string, password: string) {

      await signInWithEmailAndPassword(this.auth, email, password)
  
      const userQuery = httpsCallable<string, UserModel>(this.functions, UserFunctions.getUser)
      const userData = await userQuery(this.auth.currentUser?.uid)

      this._user = userData.data;
      this._userRole = userData.data.role;
      this._userToken = await this.auth.currentUser?.getIdToken();

      this.toggleAuthenticated(true);
      this.router.navigateByUrl('/overview/view')
  }

  async logout() {
    await signOut(this.auth)
    this._user = undefined;
    this._userToken = '';
    this._userRole = Roles.loggedOut;

    this.toggleAuthenticated();
    this.router.navigateByUrl('/auth/login')
  }

  /**
   * Signup a user in Firebase
   * @param createUserModel Model data of the new user
   */
  async signUpUser(createUserModel: CreateUserModel) {
      
    const singUpUserFunction = httpsCallable(this.functions, UserFunctions.userSignUp)

    await singUpUserFunction(createUserModel)

    this._snackBarService.showSuccess("User requested created");

    this.router.navigateByUrl('/auth/login')
    return true;

  }

  /**
   * Resets a users password
   * @param form forgot password form
   */
  async forgotPassword(form: ForgotPasswordForm) {

    const forgotPassFunction = httpsCallable<ForgotPasswordForm, null>(this.functions, UserFunctions.forgotPassword)

    await forgotPassFunction(form);

    this._snackBarService.showSuccess('Password Reset');

    this.router.navigateByUrl('/auth/login');
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
    // if invalid token, return false; clear token
    if (this._userToken) {
      this.toggleAuthenticated(true);
      return true;
    } else {
      this.toggleAuthenticated(false)
      return false;
    }
    
  }
}
