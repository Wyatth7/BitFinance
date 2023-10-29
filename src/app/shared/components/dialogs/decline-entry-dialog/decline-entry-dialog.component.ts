import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'src/app/shared/models/dialog/dialog-data';

@Component({
  selector: 'app-decline-entry-dialog',
  templateUrl: './decline-entry-dialog.component.html',
  styleUrls: ['./decline-entry-dialog.component.scss']
})
export class DeclineEntryDialogComponent {
  loading = false;
  
  comment = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<DeclineEntryDialogComponent>,
    ) {}

  async executeAction() {
    if (!this.data.action) return;

  
    this.loading = true;
    
    await this.data.action(this.comment, this.data.data);
  
    this.dialogRef.close();
  
    this.loading = false;
  }
}
