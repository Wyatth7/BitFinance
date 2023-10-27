import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatChipListboxChange } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CreateJournalEntryDialogComponent } from 'src/app/shared/components/dialogs/create-journal-entry-dialog/create-journal-entry-dialog.component';
import { NormalType } from 'src/app/shared/enums/accounts/normal-type';
import { JournalApprovalType } from 'src/app/shared/enums/journals/journal-entry-approval-type';
import { EntryListItemResponseDto } from 'src/app/shared/models/journal/dto/entry-list-item-response-dto';
import { EntryListResponseDto } from 'src/app/shared/models/journal/dto/entry-list-response-dto';
import { JournalEntryModel } from 'src/app/shared/models/journal/journal-entry-model';
import { TransactionEntryListItem } from 'src/app/shared/models/journal/transaction-entry-model';
import { DialogService } from 'src/app/shared/services/dialogs/dialog.service';
import { GetEnumValueService } from 'src/app/shared/services/enum/get-enum-value.service';
import { JournalService } from 'src/app/shared/services/journal/journal.service';
import { TopNavService } from 'src/app/shared/services/top-nav.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {
  journalStatus: JournalApprovalType = JournalApprovalType.approved;
  title = 'Approved';
  
  filter: string | undefined = '';
  journalReponse?: EntryListResponseDto;
  journalList?: EntryListItemResponseDto[] = [];

  displayedColumns = ['actions', 'entryName', 'entryDescription', 'totalDebit', 'totalCredit', 'balance', 'creationDate']

  journalListSubscription!: Subscription;

  constructor(
    private journalService: JournalService,
    public enumValues: GetEnumValueService,
    private dialogService: DialogService,
    private router: Router,
    private route: ActivatedRoute,
    private topNavService: TopNavService
  ) {}

  async ngOnInit() {
    this.topNavService.setTopNavHeader('Journal');

    this.journalListSubscription = this.journalService.jounals$
      .subscribe(entries => {
        this.journalReponse = entries;
        this.setEntryTableData(this.journalStatus);
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

  async approveEntry(journalId: string, shouldAccept: boolean) {
    await this.journalService.acceptDenyJournal(journalId, shouldAccept);
  }

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

    this.setEntryTableData($event.value);
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

  private setEntryTableData(approvalType: JournalApprovalType){ 
    switch (approvalType) {
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
}
