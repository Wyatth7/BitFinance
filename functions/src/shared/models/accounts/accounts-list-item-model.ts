import { AccountType } from "../enums/account-type";

export interface AccountsListItemModel {
    uid: string;
    accountName: string;
    accountNumber: string;
    balance: number;
    category: AccountType;
    entries: number;
}