import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { EventLogModel } from 'functions/src/shared/models/event-log/event-log-model'; //Pretty sure I can pull info from here without issues, and that this is the right path
import { UserService } from 'src/app/shared/services/user/user.service';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/shared/models/users/user-model';
import { GetEnumValueService } from 'src/app/shared/services/enum/get-enum-value.service';


@Component({
selector: 'app-account-log-dialog',
templateUrl: './account-log-dialog.component.html',
styleUrls: ['./account-log-dialog.component.scss']
})
export class AccountLogDialogComponent implements OnInit {
  showLoader = true;

  eventLog: EventLogModel;
  user?: UserModel;

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      public dialogRef: MatDialogRef<AccountLogDialogComponent>,
      public getEnum: GetEnumValueService,
      private userService: UserService,
     ) {

    this.eventLog = data.eventLog;
  }

  async ngOnInit(): Promise<void> {
    this.showLoader = true;

    let user = this.getUser();

    if (!user) {
      await this.userService.getUserList();
      user = this.getUser();
    }

    if (user) {
      user.fullName = `${user.firstName} ${user.lastName}`
      this.user = user;
    }

    this.showLoader = false;
  }

  onClose(): void {
    this.dialogRef.close();
  }
  
  private getUser(): UserModel | undefined {
    return this.userService.getUserFromStore(this.eventLog.userId);
  }
  
}
  