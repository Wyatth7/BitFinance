import * as sgMail from "@sendgrid/mail";
import { EmailMessage } from "../../models/messaging/email-message";
import * as admin from 'firebase-admin';

export abstract class Emailer {

    /**
     * Sends an email to a user
     * @param emailMessage Email message properties
     */
    static async sendCustomMessage(emailMessage: EmailMessage) {
        await sgMail.send(emailMessage);
    }

    /**
     * Sends an email to all admin users
     * @param message Message to send
     */
    static sendEmailToAdmin(message: string){ 

        // get all admin users

        // send message to each user.

    }

}