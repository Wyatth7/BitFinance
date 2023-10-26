import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateAccountDialogComponent } from 'src/app/shared/components/dialogs/create-account-dialog/create-account-dialog.component';
import { CreateJournalEntryDialogComponent } from 'src/app/shared/components/dialogs/create-journal-entry-dialog/create-journal-entry-dialog.component';
import { CreateAccountForm } from 'src/app/shared/form/partials/account-create-form';
import { AccountModel } from 'src/app/shared/models/accounts/account-model';
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

  displayedColumns = ['actions', 'entryName', 'debit', 'credit', 'date']

  dateCreated = new Date();

  constructor(
      private accountService: AccountService,
      public getEnum: GetEnumValueService,
      private topNavService: TopNavService,
      private dialogService: DialogService,
      private route: ActivatedRoute,
      private router: Router
    ) {}

  async ngOnInit(): Promise<void> {
      this.topNavService.setTopNavAction({
        tooltip: 'Create an Entry',
        icon: 'add_card',
        action: () => this.openCreateEntryModalFn()
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

  openCreateEntryModal() {
    this.dialogService.open(CreateJournalEntryDialogComponent, {
      title: 'Create An Entry',
      data: ''
    })
  }
  openCreateEntryModalFn = this.openCreateEntryModal.bind(this);

  navigateToEntry(journalId: string) {
    this.router.navigateByUrl(`/journal/${journalId}`)
  }
}
