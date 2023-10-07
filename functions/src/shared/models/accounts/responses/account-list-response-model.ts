import { AccountsListItemModel } from "../accounts-list-item-model";
import { BalanceTotalsModel } from "./balance-totals-model";

export interface AccountListResponseModel {
    accounts: AccountsListItemModel[],
    balanceTotals: BalanceTotalsModel
}