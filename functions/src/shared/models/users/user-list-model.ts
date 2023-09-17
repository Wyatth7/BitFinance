import { UserModel } from "./user-model";

export interface UserListModel {
    acceptedUsers: UserModel[];
    requestedUsers: UserModel[];
}