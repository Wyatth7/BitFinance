import { AccountType } from "src/app/shared/enums/accounts/account-type";

export interface AccountListItemModel {
    accountId: string;
    accountName: string;
    accountNumber: string;
    balance: number;
    category: AccountType;
    entries: number;
}