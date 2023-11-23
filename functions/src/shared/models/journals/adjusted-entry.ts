import { AdjustedRange } from "../../enums/journals/adjusted-range";

export interface AdjustedEntry {
  isAdjusted: boolean;
  adjustingAmount: number;
  adjustedRange: AdjustedRange;
}
