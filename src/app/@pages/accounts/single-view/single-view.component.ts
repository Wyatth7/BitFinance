import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountModel } from 'functions/src/shared/models/accounts/account-model';
import { CreateAccountDialogComponent } from 'src/app/shared/components/dialogs/create-account-dialog/create-account-dialog.component';
import { CreateAccountForm } from 'src/app/shared/form/partials/account-create-form';
import { AccountService } from 'src/app/shared/services/accounts/account.service';
import { DialogService } from 'src/app/shared/services/dialogs/dialog.service';
import { GetEnumValueService } from 'src/app/shared/services/enum/get-enum-value.service';
import { TopNavService } from 'src/app/shared/services/top-nav.service';

interface JournalEntry {
  date: Date;
  description: string;
  transactionType: string;
  amount: number;
  createdBy: string;
}

@Component({
  selector: 'app-single-view',
  templateUrl: './single-view.component.html',
  styleUrls: ['./single-view.component.scss']
})
export class SingleViewComponent implements OnInit{
  account?: AccountModel;
  journalEntries?: JournalEntry[];

  displayedColumns = ['actions', 'description', 'transactionType', 'amount', 'createdBy','date']

  dateCreated = new Date();

  constructor(
      private accountService: AccountService,
      public getEnum: GetEnumValueService,
      private topNavService: TopNavService,
      private dialogService: DialogService,
      private route: ActivatedRoute
    ) {}

  async ngOnInit(): Promise<void> {
      this.topNavService.setTopNavAction({
        tooltip: 'Add Transaction',
        icon: 'add_card',
        action: () => {}
      })

      const accountId = this.route.snapshot.url[0].path;
      this.account = await this.accountService.getAccount(accountId);
  }

  async executeEdit(editAccountData: CreateAccountForm) {
    await this.accountService.editAccount(editAccountData, this.account!.accountId)

    this.account = await this.accountService.getAccount(this.account!.accountId);
  }

  async toggleActivation() { 
    if (!this.account) return;
    
    const success = await this.accountService.toggleActivation(this.account.accountId);
    
    this.account.isActive = success 
      ? !this.account.isActive 
      : this.account.isActive 
  }

  openEditModal(){
    const formData: CreateAccountForm = {
      general: {
        accountName: this.account!.accountName,
        accountNumber: this.account!.accountNumber,
        balance: this.account!.balance,
        description: this.account!.description
      },
      types: {
        accountType: this.account!.accountType,
        statementType: this.account!.statementType,
        normalType: this.account!.normalType
      }
    }
    
    this.dialogService.open(
      CreateAccountDialogComponent, 
      {
        title: 'Edit Account',
        data: formData,
        action: this.executeEdit.bind(this)
      }
    );
  }
  openEditModalFn = this.openEditModal.bind(this);

  // journalEntries: JournalEntry[] = [
  //   {
  //     date: new Date('2023-10-01'),
  //     description: 'Sales of Products',
  //     amount: 10000,
  //     transactionType: 'debit',
  //     createdBy: 'Andrew Quarles',
  //   },
  //   {
  //     date: new Date('2023-10-02'),
  //     description: 'Purchase of Supplies',
  //     amount: 500,
  //     transactionType: 'credit',
  //     createdBy: 'Wyatt Hardin',
  //   },
  //   {
  //     date: new Date('2023-10-03'),
  //     description: 'Payment of Rent',
  //     amount: 1500,
  //     transactionType: 'credit',
  //     createdBy: 'Andrew Quarles',
  //   },
  //   {
  //     date: new Date('2023-10-01'),
  //     description: 'Sales of Products',
  //     amount: 10000,
  //     transactionType: 'debit',
  //     createdBy: 'Andrew Quarles',
  //   },
  //   {
  //     date: new Date('2023-10-02'),
  //     description: 'Purchase of Supplies',
  //     amount: 500,
  //     transactionType: 'credit',
  //     createdBy: 'Wyatt Hardin',
  //   },
  //   {
  //     date: new Date('2023-10-03'),
  //     description: 'Payment of Rent',
  //     amount: 1500,
  //     transactionType: 'credit',
  //     createdBy: 'Andrew Quarles',
  //   },
  //   {
  //     date: new Date('2023-10-01'),
  //     description: 'Sales of Products',
  //     amount: 10000,
  //     transactionType: 'debit',
  //     createdBy: 'Andrew Quarles',
  //   },
  //   {
  //     date: new Date('2023-10-02'),
  //     description: 'Purchase of Supplies',
  //     amount: 500,
  //     transactionType: 'credit',
  //     createdBy: 'Wyatt Hardin',
  //   },
  //   {
  //     date: new Date('2023-10-03'),
  //     description: 'Payment of Rent',
  //     amount: 1500,
  //     transactionType: 'credit',
  //     createdBy: 'Andrew Quarles',
  //   },
  //   {
  //     date: new Date('2023-10-01'),
  //     description: 'Sales of Products',
  //     amount: 10000,
  //     transactionType: 'debit',
  //     createdBy: 'Andrew Quarles',
  //   },
  //   {
  //     date: new Date('2023-10-02'),
  //     description: 'Purchase of Supplies',
  //     amount: 500,
  //     transactionType: 'credit',
  //     createdBy: 'Wyatt Hardin',
  //   },
  //   {
  //     date: new Date('2023-10-03'),
  //     description: 'Payment of Rent',
  //     amount: 1500,
  //     transactionType: 'credit',
  //     createdBy: 'Andrew Quarles',
  //   },
  //   {
  //     date: new Date('2023-10-01'),
  //     description: 'Sales of Products',
  //     amount: 10000,
  //     transactionType: 'debit',
  //     createdBy: 'Andrew Quarles',
  //   },
  //   {
  //     date: new Date('2023-10-02'),
  //     description: 'Purchase of Supplies',
  //     amount: 500,
  //     transactionType: 'credit',
  //     createdBy: 'Wyatt Hardin',
  //   },
  //   {
  //     date: new Date('2023-10-03'),
  //     description: 'Payment of Rent',
  //     amount: 1500,
  //     transactionType: 'credit',
  //     createdBy: 'Andrew Quarles',
  //   },
  //   // Add more journal entries as needed
  // ];
}
