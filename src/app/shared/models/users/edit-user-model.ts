import { Roles } from "../../enums/authentication/roles";

export interface EditUserModel {
    uid: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Roles;
}