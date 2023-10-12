import { Injectable } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { OverviewDataModel } from '../../models/overview/overview-data';
import { OverviewFunctions } from '../../enums/firebase-functions/overview-functions';
import { DialogService } from '../dialogs/dialog.service';
import { LoaderService } from '../component-services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class OverviewService {
  constructor(private functions: Functions,
     private dialogService: DialogService,
     private loaderService: LoaderService
     ) { }

  async getOverviewData() {
    this.loaderService.showLoader('Overview');

    try {
      const overviewQuery = httpsCallable<null, OverviewDataModel>(this.functions, OverviewFunctions.getOverview);
  
      const data = (await overviewQuery()).data;
      
      this.loaderService.stopLoader();
      return data;

    } catch (error) {
        this.dialogService.openErrorDialog({
          title: 'Overview Load Failed', 
          data: 'There was an issue retrieving overview data from the server. Please refresh the page or try again later.'
        })

      }
      this.loaderService.stopLoader();
      return;
  }
}
