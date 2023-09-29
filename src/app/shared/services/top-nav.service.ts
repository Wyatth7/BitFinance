import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs"
import { NotificationModel } from '../models/top-nav/notifications/notification-model';
import { TopNavActionModel } from '../models/top-nav/action/top-nav-action';
import { TopNavData } from '../models/top-nav/top-nav-data';
import { PageIcon } from '../enums/page-icon';

@Injectable({
  providedIn: 'root'
})
export class TopNavService {
  notifications$ = new BehaviorSubject<NotificationModel[]>([]);
  topNavData$ = new BehaviorSubject<TopNavData>({
    topNavHeader: 'Overview',
    topNavIcon: PageIcon.overview.toString(),
  })

  constructor() { }

  /**
   * Adds to the top nav notification button.
   * This updates the notifications$ observable
   */
  pushNotification(): void{ 

  }

  /**
   * Sets top nav data
   * @param topNavData Data for the top nav
   */
  setTopNav(topNavData: TopNavData) {
    this.topNavData$.next(topNavData);
  }
}
