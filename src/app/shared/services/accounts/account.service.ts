import { Injectable } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { AccountFunctions } from '../../enums/firebase-functions/account-functions';
import { AccountListResponseModel } from '../../models/accounts/account-list/account-list-response-model';
import { Subject } from 'rxjs';
import { CreateAccountForm } from '../../form/partials/account-create-form';
import { CreateEditAccountDto } from '../../models/accounts/dto/create-edit-account-dto';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  accounts$ = new Subject<AccountListResponseModel>();

  constructor(private functions: Functions, private authService: AuthenticationService) { }

  /**
   * Gets list of accounts
   * THIS FUNCTION / CALL HAS NOT BEEN TESTED
   */
  async getAccountList() {
    const accountListFunction = httpsCallable<null, AccountListResponseModel>(this.functions, AccountFunctions.getAllAccounts);

    const accounts = await accountListFunction();

    this.accounts$.next(accounts.data);
  }

  async createAccount(createAccountForm: CreateAccountForm) {
    console.log(createAccountForm);
    
    const createAccountFunction = httpsCallable<CreateEditAccountDto, any>(this.functions, AccountFunctions.createAccount);

    const test: CreateEditAccountDto = {
      ...createAccountForm,
      userId: this.authService.user!.uid
    }

    await createAccountFunction(test);

  }
}
