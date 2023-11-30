import { Injectable } from '@angular/core';
import { EmailMessage } from '../../models/messaging/email/email-message';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { MessagingFunctions } from '../../enums/firebase-functions/messaging-functions';
import { AuthenticationService } from '../authentication/authentication.service';
import { SnackBarService } from '../component-services/snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(
      private functions: Functions,
      private _authService: AuthenticationService,
      private _snackBarService: SnackBarService
    ) { }

  /**
   * Mail sent from a user
   * @param message Email message data to send
   */
  async sendCustomEmail(mailTo: string, subject: string, text: string) {
    try {
      const emailCaller = httpsCallable(this.functions, MessagingFunctions.customEmail);

      const message: EmailMessage = {
        from: this._authService.user!.email,
        to: mailTo,
        subject,
        text
      }

      await emailCaller(message);

      this._snackBarService.showSuccess('Email sent')

    } catch (error) {
      this._snackBarService.showError('Email could not be sent');
    }
  }

  async sendEmailWithAttachment(to: string, subject: string, text: string, attachment: string) {
    try {
      const emailCaller = httpsCallable(this.functions, MessagingFunctions.emailWithPdfAttachment);

      const message: EmailMessage = {
        from: this._authService.user!.email,
        to,
        subject: subject,
        text,
        attachment
      }

      await emailCaller(message);

      this._snackBarService.showSuccess('Email sent')

    } catch (error) {
      this._snackBarService.showError('Email could not be sent');
    }
  }
}
