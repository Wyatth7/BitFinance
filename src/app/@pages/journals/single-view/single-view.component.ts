import { Component } from '@angular/core';
import { MatChipListboxChange } from '@angular/material/chips';
import { GetEnumValueService } from 'src/app/shared/services/enum/get-enum-value.service';

@Component({
  selector: 'app-single-view',
  templateUrl: './single-view.component.html',
  styleUrls: ['./single-view.component.scss']
})
export class SingleViewComponent {
  date = new Date();
  showTransactions = true;

  displayedColumns = ['account', 'debit', 'credit'];
  
  files = [
    {
      accountName: 'Cash',
      debit: 500,
      credit: 500
    }
  ]
  entries = [
    {
      accountName: 'Cash',
      debit: 500,
      credit: 0
    },
    {
      accountName: 'Owner Equity',
      debit: 0,
      credit: 500
    }
  ]

  tableViewTitle = 'Transactions';

  constructor(public getEnum: GetEnumValueService) {}

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
}
