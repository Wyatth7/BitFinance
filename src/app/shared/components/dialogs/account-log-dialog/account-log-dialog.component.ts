import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { EventLogModel } from 'functions/src/shared/models/event-log/event-log-model'; //Pretty sure I can pull info from here without issues, and that this is the right path

@Component({
  selector: 'app-account-log-dialog',
  templateUrl: './account-log-dialog.component.html',
  styleUrls: ['./account-log-dialog.component.scss']
})
export class AccountLogDialogComponent {

 eventLog: EventLogModel; 

  constructor(public dialogRef: MatDialogRef<AccountLogDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
     this.eventLog = data.eventLog;
     }
    
    
    onClose(): void {
    this.dialogRef.close();
    }

}