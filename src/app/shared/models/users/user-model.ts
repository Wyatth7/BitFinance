import { Roles } from "../../enums/authentication/roles";
import { PasswordModel } from "./password-model";
import { SuspendedAccountModel } from "./suspended-account-model";

export interface UserModel {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    passwords: PasswordModel[]
    role: Roles;
    requested: boolean;
    suspended: SuspendedAccountModel | null;
    uid: string;
}