import { AccountType } from "../../enums/accounts/account-type";
import { NormalType } from "../../enums/accounts/normal-type";

export interface TransactionEntryListItem {
    accountName: string;
    accountId: string;
    normalType: NormalType;
    amount: number;
}