import { Roles } from "../../enums/authentication/roles";

export interface CreateEditUserForm {
    name: {
        firstName: string;
        lastName: string;
    };
    email: string;
    passwords: {
        password: string;
        confirmPassword: string;
    };
    role: Roles;
    securityQuestionAnswer: Date;
}