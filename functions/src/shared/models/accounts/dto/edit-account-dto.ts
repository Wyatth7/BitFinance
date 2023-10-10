import { CreateEditAccountDto } from "./create-edit-account-dto";

export interface EditAccountDto extends CreateEditAccountDto {
    accountId: string;
}