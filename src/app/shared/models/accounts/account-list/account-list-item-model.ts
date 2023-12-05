import { AccountType } from "src/app/shared/enums/accounts/account-type";
import { AccountSubType } from "src/app/shared/enums/accounts/account-subtype";
import { NormalType } from "src/app/shared/enums/accounts/normal-type";

export interface AccountListItemModel {
    accountId: string;
    accountName: string;
    accountNumber: number;
    balance: number;
    category: AccountType;
    subcategory: AccountSubType;
    entries: number;
    isActive: string;
    normalType: NormalType;
}