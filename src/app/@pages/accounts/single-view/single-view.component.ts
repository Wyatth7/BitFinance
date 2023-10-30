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
import { MatChipListboxChange, MatChipListbox } from '@angular/material/chips';
import { EventLogModel } from 'functions/src/shared/models/event-log/event-log-model';
import { MatDialog } from '@angular/material/dialog';
import { AccountLogDialogComponent } from 'src/app/shared/components/dialogs/account-log-dialog/account-log-dialog.component';

@Component({
  selector: 'app-single-view',
  templateUrl: './single-view.component.html',
  styleUrls: ['./single-view.component.scss']
})
export class SingleViewComponent implements OnInit{
  /** Spinner shown when event log data is loading */
  showEventLogSpinner = true;

  filter: string | string[] = '';
  dateFilter: {start: Date, end: Date} = {start: new Date (10/23/1950), end: new Date()};
  account?: AccountModel;

  eventLogDisplayedColumns = ['actions', 'dateChanged', 'balance', 'isActive', 'statementType'];
  eventLogData: EventLogModel[] = [];
  displayedColumns = ['actions', 'entryName', 'debit', 'credit', 'balance', 'creationDate']
  dateCreated = new Date();
  renderEntryList:boolean = true;
  tableTitle = 'Journal Entries'

  constructor(
      private accountService: AccountService,
      public getEnum: GetEnumValueService,
      private topNavService: TopNavService,
      private dialogService: DialogService,
      private route: ActivatedRoute,
      private router: Router,
      private dialog: MatDialog
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

  /* Current Work */
  async change($event: MatChipListboxChange){
    if($event.value === undefined){
      this.renderEntryList = true;
      this.tableTitle = "Journal Entries"
      return;
    }

    this.renderEntryList = $event.value;

    if(this.renderEntryList){
      this.tableTitle = 'Journal Entries';
      return;
    }
    else{
      this.tableTitle = 'Event Log';
      await this.getEventLogData();
    }

    }

  async getEventLogData(){
    this.showEventLogSpinner = true;

    const eventLogs = await this.accountService.getAccountEventLogs(this.account?.accountId);
    this.eventLogData = eventLogs;

    // this.showEventLogSpinner = false;
  }

  navigateToEventLog(){
    const dialogRef = this.dialog.open(AccountLogDialogComponent, {
       data: {  name: this.account?.accountName } //Will need this later
    });
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

  searchEmitted(value: string | null) {
    this.filter = value || '';
  }

  dateEmitted(value: {start: Date, end: Date}) {
    this.dateFilter = {...value}
  }
}
