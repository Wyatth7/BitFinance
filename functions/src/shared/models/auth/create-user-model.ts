import { UserRole } from "../../enums/user-role";

export interface CreateUserModel {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole
}