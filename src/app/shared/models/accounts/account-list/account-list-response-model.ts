import { AccountModel } from "functions/src/shared/models/accounts/account-model";
import { AccountListItemModel } from "./account-list-item-model";

export interface AccountListResponseModel {
    accounts: AccountListItemModel[],
    balanceTotals: {
        asset: number;
        liability: number;
        equity: number;
    } 
}