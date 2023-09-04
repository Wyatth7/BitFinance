import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs"
import { NotificationModel } from '../models/top-nav/notifications/notification-model';
import { TopNavActionModel } from '../models/top-nav/action/top-nav-action';

@Injectable({
  providedIn: 'root'
})
export class TopNavService {
  notifications$ = new BehaviorSubject<NotificationModel[]>([]);
  topNavActionData$ = new BehaviorSubject<TopNavActionModel>({
    show: false,
    icon: '',
    tooltip: '',
    action: () => {}
  });

  constructor() { }

  /**
   * Adds to the top nav notification button.
   * This updates the notifications$ observable
   */
  pushNotification(): void{ 

  }

  /**
   * Sets a new top nav action button
   * @param actionObject New top nav action button data
   */
  setTopNavAction(actionObject: TopNavActionModel): void {
    this.topNavActionData$.next(actionObject);
  }
}
