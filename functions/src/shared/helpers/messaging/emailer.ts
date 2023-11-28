import * as sgMail from "@sendgrid/mail";
import { EmailMessage } from "../../models/messaging/email-message";
import * as admin from 'firebase-admin';
import { FirestoreCollections } from "../../enums/firestore-collections";
import { UserRoleType } from "../../models/enums/user-role-type";
import { UserWithIdModel } from "../../models/users/user-with-id-model";
import { environment } from "../../../environment/environment";

export class Emailer {

    constructor() {
    }

    /**
     * Sends an email to a user
     * @param emailMessage Email message properties
    */
    static async sendCustomMessage(emailMessage: EmailMessage) {
       await sgMail.send(emailMessage);
    }

    static async sendSingleFromAdmin(to: string, subject: string, message: string) {

        await sgMail.send({
            to,
            from: environment.systemEmail,
            subject,
            text: message
        });
    }

    /**
     * Sends an email to all admin users
     * @param message Message to send
    */
    static async sendEmailToAdmin(subject: string, message: string){
        // get all admin users
        const usersSnapshot = await admin.firestore().collection(FirestoreCollections.users.toString())
        .where('role', '==', UserRoleType.administrator)
        .get();

        if (usersSnapshot.empty) return;

        const adminEmails = usersSnapshot.docs
        .map(user => (user.data() as UserWithIdModel).email);

         // send message to each admin user.
        await this.sendEmailToList(adminEmails, subject, message);
    }

    /**
     * Sends an email to admins and managers
     * @param subject Subject of email
     * @param message Message to send
     */
    static async sendEmailToAdminManager(subject: string, message: string) {
        // get all emails of managers and admins
        const userSnapshot = await admin.firestore()
            .collection(FirestoreCollections.users.toString())
            .where('role', 'in', [UserRoleType.administrator, UserRoleType.manager])
            .get();

        if (userSnapshot.empty) return;

        const emails = userSnapshot.docs
            .map(user => (user.data() as UserWithIdModel).email);

        await this.sendEmailToList(emails, subject, message);
    }

    static async sendEmailWithPdf(message: EmailMessage, filename: string) {
      await sgMail.send({
        to: message.to,
        subject: message.subject,
        from: message.from,
        text: message.text,
        attachments: [
          {
            content: message.attachment || '',
            filename,
            type: 'application/pdf',
            disposition: 'attachment'
          }
        ]
      })
    }

    /**
     * Emails a list of users
     * @param toList List of users to email
     * @param subject Subject of email
     * @param message Message to email
     */
    private static async sendEmailToList(toList: string[], subject: string, message: string) {

        const maildata: EmailMessage = {
            to: toList,
            from: environment.systemEmail,
            subject,
            text: message
        };

        await sgMail.send(maildata, true);

    }
}
