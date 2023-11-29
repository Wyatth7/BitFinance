import {LiquidityRatio} from "./liquidity-ratio";
import {ProfitabilityRatio} from "./profitability-ratio";
import {SolvencyRatio} from "./solvency-ratio";

export interface RatioSummary {
  liquidity: LiquidityRatio;
  profitability: ProfitabilityRatio;
  solvency: SolvencyRatio;
}
