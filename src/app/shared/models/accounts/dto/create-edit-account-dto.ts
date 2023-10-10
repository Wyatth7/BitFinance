import { CreateAccountForm } from "src/app/shared/form/partials/account-create-form";

export interface CreateEditAccountDto extends CreateAccountForm {
    userId: string;
}