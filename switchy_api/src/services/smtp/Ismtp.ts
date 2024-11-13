export interface ISmtp {
    sendEmail(email: string, subject: string, body: string): Promise<void>;
}
