import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit, OnDestroy {
  routeHeader = ''

  private _routerSubscription!: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
      this.router.events.subscribe(route => {
        const routeSnapshot = route as NavigationEnd;
        this.routeHeader = routeSnapshot.url.split('/')[1]
      });
  }

  ngOnDestroy(): void {
      this._routerSubscription.unsubscribe();
  }
}
