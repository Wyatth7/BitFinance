import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/shared/models/dialog/dialog-data';

@Component({
  selector: 'app-create-journal-entry-dialog',
  templateUrl: './create-journal-entry-dialog.component.html',
  styleUrls: ['./create-journal-entry-dialog.component.scss']
})
export class CreateJournalEntryDialogComponent {
  loading = false;

  selectedFile: any = null;

  form = this.formBuilder.group({
    general: this.formBuilder.group({
      entryName: new FormControl('', [Validators.required]),
      entryDescription: new FormControl('')
    })
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData, 
    private formBuilder: FormBuilder
  ) {}

  async executeAction(){ 

  }

  resetForm() {
    this.form.reset();
  }


}
