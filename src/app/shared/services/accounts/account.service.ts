import { Injectable } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { AccountFunctions } from '../../enums/firebase-functions/account-functions';
import { AccountListResponseModel } from '../../models/accounts/account-list/account-list-response-model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  accounts$ = new Subject<AccountListResponseModel>();

  constructor(private functions: Functions) { }

  /**
   * Gets list of accounts
   * THIS FUNCTION / CALL HAS NOT BEEN TESTED
   */
  async getAccountList() {
    const accountListFunction = httpsCallable<null, AccountListResponseModel>(this.functions, AccountFunctions.getAllAccounts);

    const accounts = await accountListFunction();

    this.accounts$.next(accounts.data);
  }
}
