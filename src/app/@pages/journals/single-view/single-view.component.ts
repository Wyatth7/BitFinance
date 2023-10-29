import { Component, OnInit } from '@angular/core';
import { MatChipListboxChange } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { DeclineEntryDialogComponent } from 'src/app/shared/components/dialogs/decline-entry-dialog/decline-entry-dialog.component';
import { JournalEntryPageModel } from 'src/app/shared/models/journal/journal-page-model';
import { DialogService } from 'src/app/shared/services/dialogs/dialog.service';
import { GetEnumValueService } from 'src/app/shared/services/enum/get-enum-value.service';
import { JournalService } from 'src/app/shared/services/journal/journal.service';
import { TopNavService } from 'src/app/shared/services/top-nav.service';

@Component({
  selector: 'app-single-view',
  templateUrl: './single-view.component.html',
  styleUrls: ['./single-view.component.scss']
})
export class SingleViewComponent implements OnInit {
  journalEntry?: JournalEntryPageModel;
  showTransactions = true;

  transactionColumns = ['actions', 'accountName', 'totalDebits', 'totalCredits'];
  fileColumns = ['actions', 'fileName', 'size', 'type'];


  tableViewTitle = 'Transactions';

  constructor(
    private journalService: JournalService,
    public getEnum: GetEnumValueService,
    private router: Router,
    private route: ActivatedRoute,
    private topNavService: TopNavService,
    private dialogService: DialogService
  ) {}

  async ngOnInit() {
    this.topNavService.setTopNavHeader('Journal Entry');

    const journalId = this.route.snapshot.url[0].path;
    this.journalEntry = await this.journalService.getJournalEntryPageData(journalId);
  }

  change($event: MatChipListboxChange) {
    if ($event.value === undefined) {
      this.showTransactions = true;
      this.tableViewTitle = 'Transactions';
      return;
    }

      this.showTransactions = $event.value;

      if (this.showTransactions) {
        this.tableViewTitle = 'Transactions'
        return;
      }

      this.tableViewTitle = 'Attached Files'
  }

  navigateToAccount(accountId: string) {
    this.router.navigateByUrl(`/accounts/${accountId}`);
  }

  downloadFile (base64String: string, fileName: string) {
    var a = document.createElement("a"); //Create <a>
    a.href = base64String; //Image Base64 Goes here
    a.download = fileName; //File name Here
    a.click(); //Downloaded file
  }

  openDeclineDialog() {
    this.dialogService.open(DeclineEntryDialogComponent, {
      title: 'Decline Entry',
      data: this.journalEntry?.journalId,
      action: this.declineEntryFn
    })
  }

  async journalApproval(shouldApprove: boolean, comment = '') {
    await this.journalService.acceptDenyJournal(this.journalEntry!.journalId, shouldApprove, comment)
  
    this.journalEntry = await this.journalService.getJournalEntryPageData(this.journalEntry!.journalId)
  }

  async declineEntry(comment: string) {
    await this.journalApproval(false, comment)
  }
  declineEntryFn = this.declineEntry.bind(this);
}
