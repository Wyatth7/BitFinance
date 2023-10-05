import { SelectionModel } from '@angular/cdk/collections';
import { AfterContentInit, AfterViewInit, Component, ContentChildren, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatColumnDef, MatTable, MatTableDataSource } from '@angular/material/table';

/**
 * Custom table compoennt that extends mat-table.
 * For table sorting, wrap column def group with in ng-container 
 *  with the matSort directive on it. Look at accounts view component.
 * 
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T> implements OnInit, OnChanges, AfterContentInit {
  @Input() tableData!: T[];
  @Input() displayedColumns!: string[];
  @Input() 
    set filters(value: string | string[] | undefined) {
      this.applyFilter(value);
    }
  
  dataSource!: MatTableDataSource<T>;
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatTable, {static: true}) table!: MatTable<T>
  @ContentChildren(MatColumnDef) columnDefs!: QueryList<MatColumnDef>;
  @ContentChildren(MatSort) sort!: QueryList<MatSort>;

  ngOnInit(): void {
      this.displayedColumns.unshift('select')
      this.dataSource = new MatTableDataSource(this.tableData);
  }

  /**
   * Used to update table when accounts added
   * @param changes simple chagnes
   */
  ngOnChanges(changes: SimpleChanges): void {
    // do nothing if data source is null
    if (!this.dataSource) return;

    // do nothing if search filter is currently applied
    if (this.dataSource.filter.length > 0) return;
    
    // create new table data source
    this.dataSource = new MatTableDataSource(this.tableData)

    if (this.sort) {
      this.sort.forEach(sort => {
        this.dataSource.sort = sort
      })
    }
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

  applyFilter(value: string | string[] | undefined) {
    if (!this.dataSource) return;
    
    if (!value) {
      this.dataSource.filter = '';
      return;
    };
    
    if (Array.isArray(value)) {
      this.dataSource.filter = value
        .join('+')
        .trim()
        .toLowerCase();
      return;
    }

    this.dataSource.filter = value.trim().toLowerCase();
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
