import * as sgMail from "@sendgrid/mail";
import { EmailMessage } from "../../models/messaging/email-message";
import * as admin from 'firebase-admin';
import { FirestoreCollections } from "../../enums/firestore-collections";
import { UserRoleType } from "../../models/enums/user-role-type";
import { UserWithIdModel } from "../../models/users/user-with-id-model";
import { environment } from "../../../environment/environment";


sgMail.setApiKey(environment.sendGridAPIKey)

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
        
         console.log(adminEmails);
     
         // send message to each user.
     
         const mailData: EmailMessage = {
             to: adminEmails,
             from: environment.systemEmail,
             subject,
             text: message
         };
     
         await sgMail.send(mailData, true);
    }
}