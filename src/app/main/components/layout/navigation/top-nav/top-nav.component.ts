import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Colors } from 'src/app/shared/enums/colors';
import { PageIcon } from 'src/app/shared/enums/page-icon';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit, OnDestroy {
  routeHeader = ''
  headerIcon = '';

  private _routerSubscription!: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
      this.router.events.subscribe(route => {
        const routeSnapshot = route as NavigationEnd;
        if (!routeSnapshot.url) return;


        this.routeHeader = routeSnapshot.url.split('/')[1];
        console.log(this.routeHeader);
        if (this.routeHeader === 'users') return;
        
        const iconEnum = PageIcon[this.routeHeader as keyof typeof PageIcon];
        this.headerIcon = iconEnum.toString();
        console.log(this.headerIcon)
      });
  }

  ngOnDestroy(): void {
      if (this._routerSubscription) {
        this._routerSubscription.unsubscribe();
      }
  }
}
