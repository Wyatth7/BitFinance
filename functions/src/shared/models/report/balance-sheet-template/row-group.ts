import {Row} from "./row";

export interface RowGroup {
  groupTitle: string;
  groupTotal: string;
  indentTotal: number;
  rows: Row[];
}
