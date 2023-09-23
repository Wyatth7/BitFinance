import { Roles } from "../../enums/authentication/roles";

export interface CreateUserModel {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Roles;
    requested?: boolean;
    securityQuestionAnswer: Date;
}