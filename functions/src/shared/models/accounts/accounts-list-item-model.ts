import { NormalType } from "../../enums/accounts/normal-type";
import { AccountType } from "../enums/account-type";
import { AccountSubType } from "../../enums/accounts/account-subtype";

export interface AccountsListItemModel {
    accountId: string;
    accountName: string;
    accountNumber: number;
    balance: number;
    category: AccountType;
    subcategory: AccountSubType;
    entries: number;
    isActive: boolean;
    normalType: NormalType;
}