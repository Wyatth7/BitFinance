import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-account-log-dialog',
  templateUrl: './account-log-dialog.component.html',
  styleUrls: ['./account-log-dialog.component.scss']
})
export class AccountLogDialogComponent {

  constructor(public dialogRef: MatDialogRef<AccountLogDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    
    
    onClose(): void {
    this.dialogRef.close();
    }

}
