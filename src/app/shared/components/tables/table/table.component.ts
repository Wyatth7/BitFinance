import { SelectionModel } from '@angular/cdk/collections';
import { AfterContentInit, AfterViewInit, Component, ContentChildren, Input, OnInit, QueryList, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatColumnDef, MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T> implements OnInit, AfterContentInit {
  @Input() tableData!: T[];
  @Input() displayedColumns!: string[];
  @Input() filters?: string[];
  
  dataSource!: MatTableDataSource<T>;
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatTable, {static: true}) table!: MatTable<T>
  @ContentChildren(MatColumnDef) columnDefs!: QueryList<MatColumnDef>;
  @ContentChildren(MatSort) sort!: QueryList<MatSort>;

  ngOnInit(): void {
      this.displayedColumns.unshift('select')
      this.dataSource = new MatTableDataSource(this.tableData);
  }

  ngAfterContentInit(): void {
    this.sort.forEach(sort => {
      this.dataSource.sort = sort
    })

    this.columnDefs
      .forEach(columnDef => {
        this.table.addColumnDef(columnDef)
      });
  }

   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.tableData.length;
    return numSelected === numRows;
  }

  applyFilter() {
    if (!this.filters) return;

    this.dataSource.filter = this.filters
      .join('+')
      .trim()
      .toLowerCase();
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
