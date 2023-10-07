import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmailUserComponent } from 'src/app/shared/components/dialogs/email-user/email-user.component';
import { TopNavData } from 'src/app/shared/models/top-nav/top-nav-data';
import { DialogService } from 'src/app/shared/services/dialogs/dialog.service';
import { EmailService } from 'src/app/shared/services/messaging/email.service';
import { TopNavService } from 'src/app/shared/services/top-nav.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit, OnDestroy {
  topNavData!: TopNavData;

  private _topNavDataSubscription!: Subscription;

  constructor(private router: Router, private topNavService: TopNavService,
    private dialogService: DialogService, private emailService: EmailService) {}

  ngOnInit(): void {
    this._topNavDataSubscription = this.topNavService.topNavData$.subscribe(
      topNavData => this.topNavData = topNavData
    );
  }

  ngOnDestroy(): void {
      this._topNavDataSubscription.unsubscribe();
  }

  navigateToHelp() {
    this.router.navigateByUrl('help')
  }

  openEmailDialog() {
    this.dialogService.open(EmailUserComponent, {
      title: 'Email User',
      data: ''
    })
  }
}
