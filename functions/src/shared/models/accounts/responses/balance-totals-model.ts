export interface BalanceTotalsModel {
    asset: number;
    liability: number;
    equity: number;
    averageTotalAsset?: number;
    averageTotalEquity?: number;
    cash?: number;
    accountsReceivable?: number;
    averageAccountsReceivable?: number;
    averageInventory?: number;
}
