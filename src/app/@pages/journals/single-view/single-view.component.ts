import { Component, OnInit } from '@angular/core';
import { MatChipListboxChange } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { JournalEntryPageModel } from 'src/app/shared/models/journal/journal-page-model';
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
    private topNavService: TopNavService
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

  async journalApproval(shouldApprove: boolean) {
    await this.journalService.acceptDenyJournal(this.journalEntry!.journalId, shouldApprove)
  
    this.journalEntry = await this.journalService.getJournalEntryPageData(this.journalEntry!.journalId)
  }
}
