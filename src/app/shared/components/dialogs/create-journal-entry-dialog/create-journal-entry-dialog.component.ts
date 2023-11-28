import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdjustedRange } from 'functions/src/shared/enums/journals/adjusted-range';
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
  transactionsValid = true;

  adjustment = false;

  

  private _selectedFiles?: File[];
  transactions: TransactionEntryListItem[] = [];

  form = this.formBuilder.group({
      entryName: new FormControl('', [Validators.required]),
      entryDescription: new FormControl('')
  })

  adjustingForm = this.formBuilder.group({
    amount: new FormControl('', [Validators.required]),
    // increaseDecrease: new FormControl('', [Validators.required]),
    frequency: new FormControl('', [Validators.required])
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData, 
    private dialogRef: MatDialogRef<CreateJournalEntryDialogComponent>,
    private formBuilder: FormBuilder,
    private journalService: JournalService
  ) {}

  async executeAction(){ 
    this.loading = true;
    let amount = 0;
    let frequency = 1;

    if(this.adjustment){
      amount = parseInt(this.adjustingForm.value.amount ?? '0');
      frequency = parseInt(this.adjustingForm.value.frequency ?? '1');
    }

    const generalEntryForm = this.form.value;

    const entryData: JournalEntryBaseModel = {
      name: generalEntryForm.entryName!,
      description: generalEntryForm.entryDescription!,
      transactions: this.transactions,
      files: this._selectedFiles,
      isAdjusted: this.adjustment,
      adjustingAmount: amount,
      adjustedRange: frequency
    }

    console.log(entryData)

    await this.journalService.createJournalEntry(entryData);

    this.loading = false;
    this.dialogRef.close();
  }

  resetForm() {
    this.form.reset();
    this.adjustingForm.reset();
    this.transactions = [],
    this.transactionsValid = true;
    this.shouldReset$.next(true);
  }

  settransactions(transactions: {transactions: TransactionEntryListItem[], isBalanced: boolean}) {
    this.transactions = transactions.transactions;
    this.transactionsValid = transactions.isBalanced
  }

  get transactionCount() {
    return this.transactions.length;
  }

  set files(files: File[]) {
    this._selectedFiles = files;
  }

  toggleAdjusting() {
    this.adjustment = !this.adjustment;
  }
}
