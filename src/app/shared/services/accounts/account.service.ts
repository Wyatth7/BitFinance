import { Injectable } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { AccountFunctions } from '../../enums/firebase-functions/account-functions';
import { AccountListResponseModel } from '../../models/accounts/account-list/account-list-response-model';
import { Subject } from 'rxjs';
import { CreateAccountForm } from '../../form/partials/account-create-form';
import { CreateEditAccountDto } from '../../models/accounts/dto/create-edit-account-dto';
import { AuthenticationService } from '../authentication/authentication.service';
import { AccountsModule } from 'src/app/@pages/accounts/accounts.module';
import { AccountModel } from '../../models/accounts/account-model';
import { EditAccountDto } from '../../models/accounts/dto/edit-account-dto';
import { ToggleActivationDto } from '../../models/accounts/dto/toggle-activation-dto';

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

  /**
   * Gets an account by ID
   * @param accountId ID of an account
   */
  async getAccount(accountId: string): Promise<AccountModel> {
    const getAccountFunction = httpsCallable<string, AccountModel>(this.functions, AccountFunctions.getAccount);

    const account = await getAccountFunction(accountId);

    return account.data;
  }

  /**
   * Creates an account
   * @param createAccountForm Form values for creating an account
   */
  async createAccount(createAccountForm: CreateAccountForm) {
    const createAccountFunction = httpsCallable<CreateEditAccountDto, any>(this.functions, AccountFunctions.createAccount);

    const createReqest: CreateEditAccountDto = {
      ...createAccountForm,
      userId: this.authService.user!.uid
    }

    await createAccountFunction(createReqest);

  }

  /**
   * Edits an account
   * @param editAccountForm Form data to send to server
   */
  async editAccount(editAccountForm: CreateAccountForm, accountId: string) {
    const editAccountFunction = httpsCallable<EditAccountDto, any>(this.functions, AccountFunctions.editAccount);
  
    const editRequest: EditAccountDto = {
      ...editAccountForm,
      userId: this.authService.user!.uid,
      accountId
    }
  
    await editAccountFunction(editRequest);
  }

  async toggleActivation(accountId: string) {
  
    try {
      const toggleAccountFunction = httpsCallable<ToggleActivationDto, any>(this.functions, AccountFunctions.toggleActivation);
    
      const dto: ToggleActivationDto = {
        accountId,
        userId: this.authService.user!.uid
      };
  
      await toggleAccountFunction(dto);
      
      return true;
    } catch (error) {
      return false;
    }
  }
}
