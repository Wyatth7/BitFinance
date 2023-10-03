import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CreateAccountDialogComponent } from 'src/app/shared/components/dialogs/create-account-dialog/create-account-dialog.component';
import { AccountType } from 'src/app/shared/enums/accounts/account-type';
import { Colors } from 'src/app/shared/enums/colors';
import { AccountTableModel } from 'src/app/shared/models/accounts/account-table-model';
import { DialogService } from 'src/app/shared/services/dialogs/dialog.service';
import { TopNavService } from 'src/app/shared/services/top-nav.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit{
  filter: string | undefined = '';

  dataSource!: MatTableDataSource<AccountTableModel>;
  displayedColumns = ['actions', 'accountName', 'balance','category', 'entries', 'accountNumber',  ]

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private topNavService: TopNavService, private dialogService: DialogService) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.accountsData);

    this.topNavService.setTopNavAction({
        icon: 'post_add',
        tooltip: 'Create An Account',
        action: () => {
          this.dialogService.open(
            CreateAccountDialogComponent,
             {
              title: 'Create Account',
              data: 'this is test data',
              action: this.executeCreate.bind(this)
            })
        },
        requiredRole: [1]
    })
  }

  async executeCreate() {
    console.log('at create callback');
  }

  searchEmitted(value: string | null) {
    this.filter = value || '';
  }

  getCategory(category: number) {
    return AccountType[category];
  }
  
  get color(): typeof Colors {
    return Colors;
  }

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




  random(): number{ 
    return Math.floor(Math.random() * 2000)
  }
}
