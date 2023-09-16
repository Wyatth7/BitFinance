import { Injectable } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { CreateUserModel } from '../../models/users/create-user-model';
import { UserFunctions } from '../../enums/firebase-functions/user-functions';
import { BehaviorSubject } from 'rxjs';
import { UserListModel } from '../../models/users/user-list-model';
import { UserModel } from '../../models/users/user-model';

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

  /**
   * Returns a user from the user store
   * @param userId ID of user to get
   * @returns The user or undefined if not found
   */
  getUserFromStore(userId: string): UserModel | undefined {
    if (!this._users) return;

    return this._users?.acceptedUsers.find(user => user.uid === userId);
  }
}
