import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription, map, startWith } from 'rxjs';
import { DialogData } from 'src/app/shared/models/dialog/dialog-data';
import { UserModel } from 'src/app/shared/models/users/user-model';
import { EmailService } from 'src/app/shared/services/messaging/email.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { CreateAccountDialogComponent } from '../create-account-dialog/create-account-dialog.component';

@Component({
  selector: 'app-email-user',
  templateUrl: './email-user.component.html',
  styleUrls: ['./email-user.component.scss']
})
export class EmailUserComponent implements OnInit, OnDestroy {
  showUserLoadingSpinner = false;
  loading = false;
  filteredOptions!: Observable<UserModel[]>;
  users?: UserModel[];

  form = this.formBuilder.group({
    mailTo: new FormControl<string | UserModel>('', [Validators.required]),
    subject: new FormControl(this.data.data.subjectStarter || '', [Validators.required]),
    message: new FormControl('', [Validators.required]),
  });

  private _userSubscription!: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<CreateAccountDialogComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private emailService: EmailService,
  ) {}

  async ngOnInit() {
    this._userSubscription = this.userService.users$.subscribe(users => {
      const userList = users.acceptedUsers.map(user => {
        user.fullName = `${user.firstName} ${user.lastName}`
        return user;
      })

      this.users = userList;
    });

    if (!this.users) {
      this.showUserLoadingSpinner = true;

      await this.userService.getUserList();

      this.showUserLoadingSpinner = false;
    }

    this.configureFilterOptions();
  }

  ngOnDestroy(): void {
      this._userSubscription.unsubscribe();
  }

  configureFilterOptions () {
    this.filteredOptions = this.form.get('mailTo')!.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : '';
        return name ? this._filter(name as string) : this.users!.slice();
      }),
    );
  }

  displayFn(user: UserModel): string {
    return user ? user.fullName! : '';
  }

  private _filter(name: string): UserModel[] {
    const filterValue = name.toLowerCase();

    return this.users!.filter(option => option.fullName!.toLowerCase().includes(filterValue));
  }

  async executeAction() {
    this.loading = true;

    const mailToValue = this.form.value.mailTo;
    const mailTo = typeof mailToValue === 'string'
      ? mailToValue
      : (mailToValue as UserModel).email;

    const subject = this.form.value.subject!;
    const message = this.form.value.message!;
    const attachment: string = this.data.data.attachment;
    if (attachment) {
      await this.emailService.sendEmailWithAttachment(mailTo, attachment);
    } else {
      await this.emailService.sendCustomEmail(mailTo, subject, message);
    }
    this.dialogRef.close();

    this.loading = false;
  }
}
