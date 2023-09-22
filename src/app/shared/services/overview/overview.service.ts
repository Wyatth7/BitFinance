import { Injectable } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { OverviewDataModel } from '../../models/overview/overview-data';
import { OverviewFunctions } from '../../enums/firebase-functions/overview-functions';
import { DialogService } from '../dialogs/dialog.service';

@Injectable({
  providedIn: 'root'
})
export class OverviewService {
  constructor(private functions: Functions, private dialogService: DialogService) { }

  async getOverviewData() {

    try {
      // new Error();
      const overviewQuery = httpsCallable<null, OverviewDataModel>(this.functions, OverviewFunctions.getOverview);
  
      const data = (await overviewQuery()).data;
      
      return data;

    } catch (error) {
        console.log(error);
        this.dialogService.openErrorDialog({
          title: 'Overview Load Failed', 
          data: 'There was an issue retrieving overview data from the server. Please refresh the page or try again later.'
        })

      return;
    }

  }
}
