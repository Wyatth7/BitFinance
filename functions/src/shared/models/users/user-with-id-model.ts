import { UserModel } from "./user-model";

export interface UserWithIdModel extends UserModel {
    uid: string;
}