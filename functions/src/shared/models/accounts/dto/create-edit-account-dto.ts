import { NormalType } from "../../../enums/accounts/normal-type";
import { StatementType } from "../../../enums/accounts/statement-type";
import { AccountType } from "../../enums/account-type";

export interface CreateEditAccountDto {
    general: {
        accountName: string;
        accountNumber: number;
        description: string;
        balance: number;
    },
    types: {
        accountType: AccountType,
        statementType: StatementType,
        normalType: NormalType
    },
    userId: string;
}