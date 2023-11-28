export interface EmailMessage {
    to: string;
    from: string;
    subject: string;
    text: string;
    html?: string;
    attachment?: any;
}
