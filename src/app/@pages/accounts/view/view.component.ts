import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AccountType } from 'src/app/shared/enums/accounts/account-type';
import { AccountTableModel } from 'src/app/shared/models/accounts/account-table-model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit{
  dataSource!: MatTableDataSource<AccountTableModel>;
  displayedColumns = ['accountNumber', 'accountName', 'balance', 'category']

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.accountsData);
  }

  // ngAfterViewInit(): void {
  //   this.dataSource.sort = this.sort;
  // }

  accountsData: AccountTableModel[] = [
    {
      accountName: 'Cash',
      accountNumber: '000001',
      category: AccountType.asset,
      balance: 14000.58999
    },
    {
      accountName: 'Accounts Payable',
      accountNumber: '000002',
      category: AccountType.liability,
      balance: 5000.46
    },
    {
      accountName: 'Income',
      accountNumber: '000003',
      category: AccountType.equity,
      balance: 10000
    },
    {
      accountName: 'Vehicles',
      accountNumber: '000004',
      category: AccountType.asset,
      balance: 56000.98
    },
  ]


  getCategory(category: number) {
    return AccountType[category];
  }
}
