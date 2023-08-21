import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated$ = new BehaviorSubject<boolean>(true);

  constructor() { }

  toggleAuthenticated(shouldActivate = false) {
    this.isAuthenticated$.next(shouldActivate);
  }
}
