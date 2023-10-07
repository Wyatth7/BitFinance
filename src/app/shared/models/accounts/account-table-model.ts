import { AccountType } from "../../enums/accounts/account-type";

export interface AccountTableModel {
    accountName: string;
    accountNumber: string;
    balance: number;
    category: AccountType;
}