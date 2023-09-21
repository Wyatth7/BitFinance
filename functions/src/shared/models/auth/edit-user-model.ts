import { CreateUserModel } from "./create-user-model";

export interface EditUserModel extends CreateUserModel {
    uid: string;
}