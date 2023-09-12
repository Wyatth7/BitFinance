import { UserRole } from "../../enums/user-role";
import { PasswordModel } from "./passwords";
import { SuspendedAccountModel } from "./suspended-model";

export interface UserModel {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    passwords: PasswordModel[]
    role: UserRole;
    requested: boolean;
    suspended: SuspendedAccountModel | null;
}