import {IncomeExpense} from "../../models/calculations/income-expense";
import {BalanceTotalsModel} from "../../models/accounts/responses/balance-totals-model";
import {RatioSummary} from "../../models/overview/ratios/ratio-summary";
import {ProfitabilityRatio} from "../../models/overview/ratios/profitability-ratio";
import {LiquidityRatio} from "../../models/overview/ratios/liquidity-ratio";
import {SolvencyRatio} from "../../models/overview/ratios/solvency-ratio";

export class RatioCalculations {

  /**
   * Convenience method to calculate all ratios
   */
  static calculateAll(incomeExpense: IncomeExpense, balanceSheet: BalanceTotalsModel): RatioSummary {
    const liquidity = this.liquidityRatios(incomeExpense, balanceSheet);
    console.log(liquidity)
    const profitability = this.profitabilityRatios(incomeExpense, balanceSheet);
    const solvency = this.solvencyRatios(incomeExpense.grossIncome, balanceSheet.averageTotalAsset || 0);

    return {
      liquidity,
      profitability,
      solvency
    }
  }

  /**
   * Calculates liquidity ratios
   * @param incomeExpense
   * @param balanceTotals
   */
  static liquidityRatios(incomeExpense: IncomeExpense, balanceTotals: BalanceTotalsModel): LiquidityRatio {
    const current = balanceTotals.asset / balanceTotals.liability;
    const acidTest = balanceTotals.cash! + balanceTotals.accountsReceivable! / balanceTotals.liability;
    const accountsReceivableTurnover = incomeExpense.grossIncome /( balanceTotals.averageAccountsReceivable! || 1);
    const inventoryTurnover = (incomeExpense.costOfGoodsSold! || 0) / (balanceTotals.averageInventory! || 1);

    if (balanceTotals.liability === 0) {
      return{
        current: 0,
        acidTest: 0,
        accountsReceivableTurnover,
        inventoryTurnover
      }
    }

    return {
      current,
      acidTest,
      accountsReceivableTurnover,
      inventoryTurnover
    }
  }

  /**
   * calculates profitability ratios
   * @param incomeExpense income expense totals
   * @param balanceTotals balance sheet total
   */
  static profitabilityRatios(incomeExpense: IncomeExpense, balanceTotals: BalanceTotalsModel): ProfitabilityRatio {
    const netProfitMargin = incomeExpense.netIncome / incomeExpense.grossIncome;
    const returnOnAsset = incomeExpense.netIncome / (balanceTotals.averageTotalAsset || 0)
    const returnOnEquity = incomeExpense.netIncome / (balanceTotals.averageTotalEquity || 0);

    let grossMargin = 0;
    if (incomeExpense.costOfGoodsSold) {
      grossMargin =
        (incomeExpense.grossIncome - incomeExpense.costOfGoodsSold) / incomeExpense.grossIncome
    }

    return {
      netProfitMargin: netProfitMargin,
      returnOnEquity: returnOnAsset || 0,
      returnOnAssets: returnOnEquity || 0,
      grossMargin: grossMargin,
      assetTurnover: incomeExpense.grossIncome / balanceTotals.averageTotalAsset!
    }
  }

  static solvencyRatios(assets: number, liability: number): SolvencyRatio {
    const debtToAsset = liability / assets;

    return {
      debtToAsset
    }
  }
}
