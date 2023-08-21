import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from './shared/services/authentication.service';
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'City Fitness';
  isAuthenticated = false;

  isAuthenticatedSubscription!: Subscription;

  constructor(private readonly _authenticationService: AuthenticationService) {}

  ngOnInit(): void {
      this.isAuthenticatedSubscription = this._authenticationService
        .isAuthenticated$
        .subscribe(authenticated => this.isAuthenticated = authenticated);
  }

  ngOnDestroy(): void {
      this.isAuthenticatedSubscription.unsubscribe();
  }
}
