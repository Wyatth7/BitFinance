import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { EventLogModel } from 'functions/src/shared/models/event-log/event-log-model'; //Pretty sure I can pull info from here without issues, and that this is the right path
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-account-log-dialog',
  templateUrl: './account-log-dialog.component.html',
  styleUrls: ['./account-log-dialog.component.scss']
})
export class AccountLogDialogComponent {

 eventLog: EventLogModel; 
 userFullName: string = '';

  constructor(public dialogRef: MatDialogRef<AccountLogDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService) {

     this.eventLog = data.eventLog;
     
     }
  
    onClose(): void {
    this.dialogRef.close();
    }

}