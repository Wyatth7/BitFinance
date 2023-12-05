import { AccountType } from "../../enums/accounts/account-type";
import { AccountSubType } from "../../enums/accounts/account-subtype";
import { NormalType } from "../../enums/accounts/normal-type";
import { StatementType } from "../../enums/accounts/statement-type";
import { AccountEntryModel } from "./account-entry-model";

export interface AccountModel {
    accountName: string;
    accountNumber: number;
    description: string;
    balance: number;
    accountType: AccountType;
    accountSubType: AccountSubType;
    normalType: NormalType;
    statementType: StatementType;
    accountId: string;
    createdOn: string;
    isActive: boolean;
    entryList: AccountEntryModel[];
}