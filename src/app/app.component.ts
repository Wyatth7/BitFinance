import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from './shared/services/authentication/authentication.service';
import {Observable, Subscription} from 'rxjs'
import { Functions } from '@angular/fire/functions';
import { environment } from 'src/environments/environment';
import { CreateUserModel } from './shared/models/users/create-user-model';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'City Fitness';
  isAuthenticated = false;

  isAuthenticatedSubscription!: Subscription;

  constructor(private _authenticationService: AuthenticationService,
    private functions: Functions) {}

  ngOnInit(): void {
      // subscribe to user auth status
      this.isAuthenticatedSubscription = this._authenticationService
        .isAuthenticated$
        .subscribe(authenticated => this.isAuthenticated = authenticated);

      // check if user's auth token is valid/exists 
      this._authenticationService.checkTokenStatus();

      // set function domain based on environment
      this.functions.customDomain = environment.firebaseEmulators.customDomain;
  }

  ngOnDestroy(): void {
      this.isAuthenticatedSubscription.unsubscribe();
  }
}
