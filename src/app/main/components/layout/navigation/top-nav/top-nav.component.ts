import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PageIcon } from 'src/app/shared/enums/page-icon';
import { TopNavActionModel } from 'src/app/shared/models/top-nav/action/top-nav-action';
import { TopNavService } from 'src/app/shared/services/top-nav.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit, OnDestroy {
  routeHeader = ''
  headerIcon = '';
  actionButtonData!: TopNavActionModel;

  private _routerSubscription!: Subscription;
  private _topNavActionSubscription!: Subscription;

  constructor(private router: Router, private topNavService: TopNavService) {}

  ngOnInit(): void {
      this.router.events.subscribe((route: any) => {

        let routeSnapshot = route;
        if (route.constructor.name === 'Scroll' && route.routerEvent.constructor.name === 'NavigationEnd') {
          routeSnapshot = {
            url: route.routerEvent.url
          }
        }
    
        this.updateRouteHeader(routeSnapshot);
      });

      this._topNavActionSubscription = this.topNavService
        .topNavActionData$
        .subscribe(actionData => this.actionButtonData = actionData);
  }

  ngOnDestroy(): void {
      if (this._routerSubscription) {
        this._routerSubscription.unsubscribe();
      }

      this._topNavActionSubscription.unsubscribe();
  }

  updateRouteHeader(routeSnapshot: any) {
    if (!routeSnapshot.url) return;

    this.routeHeader = routeSnapshot.url.split('/')[1];
    
    if (this.routeHeader === 'auth') return;
    
    const iconEnum = PageIcon[this.routeHeader as keyof typeof PageIcon];
    this.headerIcon = iconEnum.toString();
  }
}
