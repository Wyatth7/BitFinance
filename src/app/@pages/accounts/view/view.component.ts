import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CreateAccountDialogComponent } from 'src/app/shared/components/dialogs/create-account-dialog/create-account-dialog.component';
import { AccountType } from 'src/app/shared/enums/accounts/account-type';
import { AccountSubType } from 'functions/src/shared/enums/accounts/account-subtype';
import { Colors } from 'src/app/shared/enums/colors';
import { CreateAccountForm } from 'src/app/shared/form/partials/account-create-form';
import { AccountListResponseModel } from 'src/app/shared/models/accounts/account-list/account-list-response-model';
import { AccountService } from 'src/app/shared/services/accounts/account.service';
import { LoaderService } from 'src/app/shared/services/component-services/loader.service';
import { DialogService } from 'src/app/shared/services/dialogs/dialog.service';
import { TopNavService } from 'src/app/shared/services/top-nav.service';
import {CamelCaseToTitleCasePipe } from 'src/app/shared/pipes/camel-case-to-title-case.pipe';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {
  filter: string | undefined = '';
  accountsData?: AccountListResponseModel;

  displayedColumns = ['actions', 'accountName', 'balance','category', 'subcategory', 'entries', 'accountNumber', 'status' ]

  @ViewChild(MatSort) sort!: MatSort;

  private _accountsSubscription!: Subscription;

  constructor(
    private topNavService: TopNavService,
    private dialogService: DialogService, 
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    ) {}

  async ngOnInit(): Promise<void> {

    this._accountsSubscription = this.accountService.accounts$
      .subscribe(accountsResponse => this.accountsData = accountsResponse)
    
    this.topNavService.setTopNavAction({
      icon: 'post_add',
      tooltip: 'Create An Account',
      action: this.openCreateDialog.bind(this),
        requiredRole: [1]
      });

      this.loaderService.showLoader('Chart of Accounts');
      await this.accountService.getAccountList()
      this.loaderService.stopLoader();
    }

  ngOnDestroy(): void {
      this._accountsSubscription.unsubscribe();
  }

  openCreateDialog() {
    this.dialogService.open(
      CreateAccountDialogComponent,
      {
        title: 'Create Account',
        data: 'this is test data',
        action: this.executeCreate.bind(this)
      })
    
  }
  openCreateDialogFn = this.openCreateDialog.bind(this);

  async executeCreate(formData: CreateAccountForm) {
    await this.accountService.createAccount(formData);

    await this.accountService.getAccountList();
  }

  searchEmitted(value: string | null) {
    this.filter = value || '';
  }

  getCategory(category: number) {
    return AccountType[category];
  }

  getSubCategory(subcategory: number){
    return AccountSubType[subcategory];
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