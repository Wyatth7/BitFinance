import { AccountType } from "../../enums/accounts/account-type";
import { NormalType } from "../../enums/accounts/normal-type";
import { StatementType } from "../../enums/accounts/statement-type";

export interface AccountModel {
    accountName: string;
    accountNumber: string;
    description: string;
    balance: number;
    accountType: AccountType;
    normalType: NormalType;
    statementType: StatementType;
    accountId: string;
    createdOn: string;
}