import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountModel } from 'functions/src/shared/models/accounts/account-model';
import { Subscription } from 'rxjs';
import { CreateAccountDialogComponent } from 'src/app/shared/components/dialogs/create-account-dialog/create-account-dialog.component';
import { AccountType } from 'src/app/shared/enums/accounts/account-type';
import { Colors } from 'src/app/shared/enums/colors';
import { CreateAccountForm } from 'src/app/shared/form/partials/account-create-form';
import { AccountListItemModel } from 'src/app/shared/models/accounts/account-list/account-list-item-model';
import { AccountListResponseModel } from 'src/app/shared/models/accounts/account-list/account-list-response-model';
import { AccountTableModel } from 'src/app/shared/models/accounts/account-table-model';
import { AccountService } from 'src/app/shared/services/accounts/account.service';
import { DialogService } from 'src/app/shared/services/dialogs/dialog.service';
import { TopNavService } from 'src/app/shared/services/top-nav.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {
  filter: string | undefined = '';
  accountsData?: AccountListResponseModel;

  dataSource!: MatTableDataSource<AccountModel>;
  displayedColumns = ['actions', 'accountName', 'balance','category', 'entries', 'accountNumber',  ]

  @ViewChild(MatSort) sort!: MatSort;

  private _accountsSubscription!: Subscription;

  constructor(
    private topNavService: TopNavService,
    private dialogService: DialogService, 
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  async ngOnInit(): Promise<void> {

    this._accountsSubscription = this.accountService.accounts$.subscribe(accountsResponse => this.accountsData = accountsResponse)
    
    // this.dataSource = new MatTableDataSource(this.accountsData.accounts);
    
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
      });

      await this.accountService.getAccountList()
    }

  ngOnDestroy(): void {
      this._accountsSubscription.unsubscribe();
  }

  async executeCreate(formData: CreateAccountForm) {
    console.log(formData);
    
    await this.accountService.createAccount(formData);
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

  navigateToView(id: string) {
    this.router.navigate(['../',id], {relativeTo: this.route});
  }

  random(): number{ 
    return Math.floor(Math.random() * 2000)
  }
}
