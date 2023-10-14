import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatChipListboxChange } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionEntryListItem } from 'functions/src/shared/models/journals/transaction-entry';
import { Subscription } from 'rxjs';
import { CreateJournalEntryDialogComponent } from 'src/app/shared/components/dialogs/create-journal-entry-dialog/create-journal-entry-dialog.component';
import { NormalType } from 'src/app/shared/enums/accounts/normal-type';
import { JournalApprovalType } from 'src/app/shared/enums/journals/journal-entry-approval-type';
import { EntryListResponseDto } from 'src/app/shared/models/journal/dto/entry-list-response-dto';
import { JournalEntryModel } from 'src/app/shared/models/journal/journal-entry-model';
import { DialogService } from 'src/app/shared/services/dialogs/dialog.service';
import { JournalService } from 'src/app/shared/services/journal/journal.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {
  filter: string | undefined = '';
  journalStatus: JournalApprovalType = JournalApprovalType.approved;
  title = 'Approved';
  journalReponse?: EntryListResponseDto;
  journalList?: JournalEntryModel[];

  displayedColumns = ['actions', 'entryName', 'entryDescription', 'debit', 'credit', 'balance', 'date']

  journalListSubscription!: Subscription;

  constructor(
    private journalService: JournalService,
    private dialogService: DialogService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.journalListSubscription = this.journalService.jounals$
      .subscribe(entries => {
        this.journalReponse = entries
      });

      await this.journalService.getJournals();
  }

  ngOnDestroy(): void {
      this.journalListSubscription.unsubscribe();
  }

  async createEntryDialog() {
    this.dialogService.open(CreateJournalEntryDialogComponent, {
      title: 'Create An Entry',
      data: ''
    })
  }
  createEntryDialogFn = this.createEntryDialog.bind(this);

  searchEmitted(value: string | null) {
    this.filter = value || '';
  }

  navigateToView(id: string) {
    this.router.navigate(['../',id], {relativeTo: this.route});
  }

  change($event: MatChipListboxChange): void {
    if ($event.value === undefined) {
      this.journalStatus = JournalApprovalType.approved;
      this.title = 'Approved';
      return;
    }

    switch ($event.value) {
      case JournalApprovalType.approved:
        this.journalStatus = JournalApprovalType.approved;
        this.title = 'Approved';
        this.journalList = this.journalReponse?.approved || [];
        break;
      case JournalApprovalType.requested:
        this.journalStatus = JournalApprovalType.requested;
        this.title = 'Requested';
        this.journalList = this.journalReponse?.requested || [];
        break;
      case JournalApprovalType.declined:
        this.journalStatus = JournalApprovalType.declined;
        this.title = 'Declined';
        this.journalList = this.journalReponse?.declined || [];
        break;
      default: break;
    }
  }

  /**
   * Calculates the debit or credit amount for a single entry
   * @param entry entry to get credit/debit data from
   * @param isDebit Calculate debit amount, false if credit
   */
  getSingleCreditDebitAmount(entry: JournalEntryModel, isDebit = true) {
    let amount = 0;
    
    if (isDebit) {
      entry.transactions.forEach(
        transaction => transaction.normalType === NormalType.debit 
          ? amount += transaction.amount 
          : null);
      return amount;
    }

    entry.transactions.forEach(
      transaction => transaction.normalType === NormalType.credit 
        ? amount += transaction.amount 
        : null);

    return amount;
  }

  getEntryBalance(transactions: TransactionEntryListItem[]) {
    let amount = 0;

    transactions.forEach(
      transaction => transaction.normalType === NormalType.credit 
        ? amount += transaction.amount 
        : null);

    return amount;
  }
}
