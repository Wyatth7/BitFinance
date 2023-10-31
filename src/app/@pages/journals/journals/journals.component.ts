import { Component, OnInit } from '@angular/core';
import { CreateJournalEntryDialogComponent } from 'src/app/shared/components/dialogs/create-journal-entry-dialog/create-journal-entry-dialog.component';
import { PageIcon } from 'src/app/shared/enums/page-icon';
import { DialogService } from 'src/app/shared/services/dialogs/dialog.service';
import { TopNavService } from 'src/app/shared/services/top-nav.service';

@Component({
  selector: 'app-journals',
  templateUrl: './journals.component.html',
  styleUrls: ['./journals.component.scss']
})
export class JournalsComponent implements OnInit {

  constructor(private topNavService: TopNavService, private dialogService: DialogService) {}

  ngOnInit(): void {
      
    this.topNavService.setTopNav({
      topNavHeader: 'Journal',
      topNavIcon: PageIcon.accounts.toString(),
      topNavAction: {
        icon: PageIcon.card.toString(),
        tooltip: 'Create An Entry',
        action: () => {
          this.dialogService.open(CreateJournalEntryDialogComponent, {
            title: 'Create An Entry',
            data: ''
          })
        },
      },
    })
  }
}
