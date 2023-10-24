import { NormalType } from "../../enums/accounts/normal-type";

export interface Transaction {
    amount: number;
    normalType: NormalType;
    accountId: string;
}