import { Injectable } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { CreateUserModel } from '../../models/users/create-user-model';
import { UserFunctions } from '../../enums/firebase-functions/user-functions';
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

  /**
   * Updated the user store's suspension status.
   * @param userId ID of user to find in store
   * @param start Optional start date for suspension
   * @param end Optional end date for suspension
   * @returns True if suspended, false if not suspended
   */
  updateUserStoreSuspension(userId: string, start?: Date, end?: Date) {
    const userIndex = this._users?.acceptedUsers.findIndex(user => user.uid === userId);

    if (!userIndex || !this._users) return;

    
    if (!start || !end) {
      this._users.acceptedUsers[userIndex].suspended = null;
  
      return true;
    }

    this._users.acceptedUsers[userIndex].suspended = {
      start,
      end
    };

    return true;
  }

  /**
   * Toggles the activation status of the user.
   * @param userId ID of the user to toggle activation
   */
  updateUserActivationStore(userId: string) {
    const userIndex = this._users?.acceptedUsers.findIndex(user => user.uid === userId);

    if (!userIndex || !this._users) return;

    this._users.acceptedUsers[userIndex].isActive = !this._users.acceptedUsers[userIndex].isActive;
  }

  /**
   * Query to suspend a user
   * @param userId ID of user to suspend
   * @param start Start date of suspension
   * @param end end date of suspension
   * @returns True if suspended, false if not suspended
   */
  async suspendUser(userId: string, start: Date, end: Date) {
    
    try {
      const updateQuery = httpsCallable(this.functions, UserFunctions.suspendUser);
  
      const response = await updateQuery({uid: userId, suspendDates: {start, end}})
  
      this.updateUserStoreSuspension(userId, start, end);

      return true;
      
    } catch (error) {
      console.log(error);
      return false;
    }
    
  }

    /**
   * Query to unsuspend a user
   * @param userId ID of user to unsuspend
   * @returns True if suspended, false if not suspended
   */
  async unsuspendUser(userId: string) {

    try {
      const updateQuery = httpsCallable(this.functions, UserFunctions.removeSuspension);
  
      const response = await updateQuery(userId);

      this.updateUserStoreSuspension(userId);

      return true;

    } catch(error) {
      console.log(error);
      return false;
    }
    
  }

  async toggleActivation(userId: string) {
    try {
      const updateQuery = httpsCallable(this.functions, UserFunctions.toggleActivation);

      const response = await updateQuery(userId);

      this.updateUserActivationStore(userId);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

}
