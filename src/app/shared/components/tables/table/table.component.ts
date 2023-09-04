import { SelectionModel } from '@angular/cdk/collections';
import { AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList, ViewChild } from '@angular/core';
import { MatColumnDef, MatTable } from '@angular/material/table';
import { TableLayout } from 'src/app/shared/models/members/table/table-layout';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T> implements OnInit, AfterContentInit {
  @Input() tableData!: T[];
  @Input() displayedColumns!: string[];
 
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatTable, {static: true}) table!: MatTable<T>
  @ContentChildren(MatColumnDef) columnDefs!: QueryList<MatColumnDef>;

  ngOnInit(): void {
      this.displayedColumns.unshift('select')
      console.log(this.displayedColumns);
      
  }

  ngAfterContentInit(): void {
      this.columnDefs
        .forEach(columnDef => this.table.addColumnDef(columnDef));
  }

   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.tableData.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.tableData);
  }
}
