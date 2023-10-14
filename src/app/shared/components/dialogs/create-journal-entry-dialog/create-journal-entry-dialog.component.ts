import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { DialogData } from 'src/app/shared/models/dialog/dialog-data';
import { JournalEntryBaseModel } from 'src/app/shared/models/journal/journal-entry-base-model';
import { TransactionEntryListItem } from 'src/app/shared/models/journal/transaction-entry-model';
import { JournalService } from 'src/app/shared/services/journal/journal.service';

@Component({
  selector: 'app-create-journal-entry-dialog',
  templateUrl: './create-journal-entry-dialog.component.html',
  styleUrls: ['./create-journal-entry-dialog.component.scss']
})
export class CreateJournalEntryDialogComponent {
  loading = false;
  shouldReset$ = new Subject<boolean>();
  transactionsValid = false;

  private _selectedFiles?: File[];
  private _transactions: TransactionEntryListItem[] = [];

  form = this.formBuilder.group({
      entryName: new FormControl('', [Validators.required]),
      entryDescription: new FormControl('')
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData, 
    private dialogRef: MatDialogRef<CreateJournalEntryDialogComponent>,
    private formBuilder: FormBuilder,
    private journalService: JournalService
  ) {}

  async executeAction(){ 
    this.loading = true;

    console.log(this._selectedFiles);
    
    const generalEntryForm =  this.form.value;
    const entryData: JournalEntryBaseModel = {
      name: generalEntryForm.entryName!,
      description: generalEntryForm.entryDescription!,
      transactions: this._transactions,
      files: this._selectedFiles
    }
    
    await this.journalService.createJournalEntry(entryData);

    this.loading = false;
    this.dialogRef.close();
  }

  resetForm() {
    this.form.reset();
    this._transactions = [],
    this.transactionsValid = false;
    this.shouldReset$.next(true);
  }

  set transactions(transactions: {transactions: TransactionEntryListItem[], isBalanced: boolean}) {
    this._transactions = transactions.transactions;
    this.transactionsValid = transactions.isBalanced
  }

  get transactionCount() {
    return this._transactions.length;
  }

  set files(files: File[]) {
    this._selectedFiles = files;
  }
}
