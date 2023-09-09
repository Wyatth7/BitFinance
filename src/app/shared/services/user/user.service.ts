import { Injectable } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { CreateUserModel } from '../../models/users/create-user-model';
import { UserFunctions } from '../../enums/firebase-functions/user-functions';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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
}
