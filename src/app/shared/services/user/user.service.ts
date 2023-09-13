import { Injectable } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { CreateUserModel } from '../../models/users/create-user-model';
import { UserFunctions } from '../../enums/firebase-functions/user-functions';
import { BehaviorSubject } from 'rxjs';
import { UserListModel } from '../../models/users/user-list-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _users: UserListModel | null = null;

  constructor(private functions: Functions) { }

  /**
   * Creates a user in Firebase
   * @param createUserModel Model data of the new user
   * @returns true if success, false if fail
   */
  async createUser(createUserModel: CreateUserModel): Promise<boolean> {
    
    const createUserFunction = httpsCallable(this.functions, UserFunctions.createUser)

    try {
      console.log('in service');
      
      await createUserFunction(createUserModel)
      return true;
    } catch (error) {
      return false;
    }

  }

  async getUserList() {
    if (!this._users) {
      const usersQuery = httpsCallable(this.functions, UserFunctions.getUsers)
      this._users = (await usersQuery()).data as UserListModel;
    }

    return this._users;
  }
}
