import { UserModel } from "../../user-model";

export interface UserListResponseModel {
    acceptedUsers: UserModel[];
    requestedUsers: UserModel[];
}