import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TopNavData } from 'src/app/shared/models/top-nav/top-nav-data';
import { TopNavService } from 'src/app/shared/services/top-nav.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit, OnDestroy {
  topNavData!: TopNavData;

  private _topNavDataSubscription!: Subscription;

  constructor(private router: Router, private topNavService: TopNavService) {}

  ngOnInit(): void {
    this._topNavDataSubscription = this.topNavService.topNavData$.subscribe(
      topNavData => this.topNavData = topNavData
    );
  }

  ngOnDestroy(): void {
      this._topNavDataSubscription.unsubscribe();
  }

  navigateToHelp() {
    this.router.navigateByUrl('help')
  }
}
