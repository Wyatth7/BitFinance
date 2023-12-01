import {RowGroup} from "./row-group";

export interface Section {
  /**
   * Group header that is centered in the table.
   * This is the only content in the row.
   * If this is empty/undefined it gets ignored
   */
  sectionHeader?: string;
  /**
   * This is the sum of all values in the group.
   * Rendered as string
   */
  sectionTotal?: string;
  rowGroups: RowGroup[];
}
