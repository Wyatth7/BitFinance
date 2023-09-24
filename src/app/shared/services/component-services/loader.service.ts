import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { PageLoadModel } from '../../models/page/page-load-model';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private _pageLoadModel?: PageLoadModel;
  isLoading$ = new Subject<PageLoadModel>();

  constructor() { }

  showLoader(pageTitle: string) {
    this._pageLoadModel = {
      pageTitle,
      isLoading: true
    }

    this.isLoading$.next(this._pageLoadModel);
  }

  stopLoader(){ 
    if (!this._pageLoadModel) return;

    this._pageLoadModel.isLoading = false;
    this.isLoading$.next(this._pageLoadModel);
  }
}
