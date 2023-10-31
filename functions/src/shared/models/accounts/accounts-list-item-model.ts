import { NormalType } from "../../enums/accounts/normal-type";
import { AccountType } from "../enums/account-type";

export interface AccountsListItemModel {
    accountId: string;
    accountName: string;
    accountNumber: number;
    balance: number;
    category: AccountType;
    entries: number;
    isActive: boolean;
    normalType: NormalType;
}