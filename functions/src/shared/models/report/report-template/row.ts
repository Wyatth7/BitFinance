export interface Row {
  /**
   * Title to be shown for the row. Text justified at row start.
   */
  title: string;
  /**
   * Value of row. Text justified at row end
   * Rendered as string.
   * If undefined, render nothing
   */
  values: string[];
  /**
   * Spaces to indent the row title.
   * If 0, the report engine will interpret this row as
   * a header row.
   */
  indent: number;
}
