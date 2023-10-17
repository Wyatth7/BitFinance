import * as sgMail from "@sendgrid/mail";
import { EmailMessage } from "../shared/models/messaging/email-message";
import { onRequest } from "firebase-functions/v2/https";
import { badRequestResponse, okResponse } from "../shared/responses/responses";
import * as logger from "firebase-functions/logger";
import { environment } from "../environment/environment";


sgMail.setApiKey(environment.sendGridAPIKey);

export const emailCustomMessage = onRequest(
    {cors: true},
    async (req, res) => {
        const message = req.body.data as EmailMessage;

        if (!message) return badRequestResponse("The email data provided is invalid.", res);

        try {
            
            await sgMail.send(message)

            return okResponse({}, 200, res);
        } catch (error: any) {
            logger.error(error);
            return badRequestResponse("Could not send email to the user.", res);
        }

    }
)