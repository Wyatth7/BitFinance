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

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated$ = new BehaviorSubject<boolean>(false);
  private _isAuthenticated = false;

  // token and roles come from login and should be saved to local storage.
  private _user?: UserModel;
  private _userRole: Roles = Roles.administrator;
  private _userToken: string | undefined = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImFhMDhlN2M3ODNkYjhjOGFjNGNhNzJhZjdmOWRkN2JiMzk4ZjE2ZGMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoid2hhcmRpbjkyMDIzIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2FjY291bnRpbmctYXBwLXRlc3QiLCJhdWQiOiJhY2NvdW50aW5nLWFwcC10ZXN0IiwiYXV0aF90aW1lIjoxNjk1MDY3NjY4LCJ1c2VyX2lkIjoiQ0lkSDNvOVNsRU45em9veWhJalNsMm1wUVlNMiIsInN1YiI6IkNJZEgzbzlTbEVOOXpvb3loSWpTbDJtcFFZTTIiLCJpYXQiOjE2OTUwNjc2NjgsImV4cCI6MTY5NTA3MTI2OCwiZW1haWwiOiJ3aGFyZGluMTAxMEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ3aGFyZGluMTAxMEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.pNn3WxnHxP6LA9lms1Bz-HsOfKKo0vAmyAGay2jo6Mq7AygSxNmzEpqEs93eO2RmKDpH61kZCQVIIpyeqBuErPMsdYS1J-LMWkZJ8l8kjltYe84qE0zaqxN67-ibF0R6LulTrAQePGlfiXYM4Ic0MpbY8-tm5myLMnRaYL4ZJfpR_JixZYnJKZRI8pxAlKYkG3Bh50lg83PkuJ6zbQBlHYxm6-DvHbJyrjvQZD5G_mAy3vmtBye4mJpyLl_Yk_qsT6QicfTwQ5bKUu-fq6fTWc7YKpZ4bf5aSXzG8Smr48f7qWNED9YBHDgY7GxTAKmfsQUC2Hd8HIGbYuK6Talpwg';

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
    private functions: Functions) {}

  // This will call a login API
  // If login, set role and auth status
  async login(email: string, password: string) {

    try {
      await signInWithEmailAndPassword(this.auth, email, password)
  
      const userQuery = httpsCallable<string, UserModel>(this.functions, UserFunctions.getUser)
      const userData = await userQuery(this.auth.currentUser?.uid)

      this._user = userData.data;
      this._userRole = userData.data.role;
      this._userToken = await this.auth.currentUser?.getIdToken();

      this.toggleAuthenticated(true);
      this.router.navigateByUrl('/overview/view')
    } catch(e) {
      console.log(e);
    }
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

    try {
      await singUpUserFunction(createUserModel)
      this.router.navigateByUrl('/auth/login')
      return true;
    } catch (error) {
      return false;
    }

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
