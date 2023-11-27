import { NormalType } from "../../enums/accounts/normal-type";
import { StatementType } from "../../enums/accounts/statement-type";
import { AccountType } from "../enums/account-type";
//import {AccountSubType} from ""

export interface AccountModel {
    accountName: string;
    accountNumber: number;
    description: string;
    balance: number;
    accountType: AccountType;
    //accountSubType: accountSubType;
    normalType: NormalType;
    statementType: StatementType;
    accountId: string;
    createdOn: string;
    isActive: boolean;
    entries: number;
}