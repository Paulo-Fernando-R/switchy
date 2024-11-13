import nodemailer, { Transporter, SendMailOptions } from "nodemailer";

import { emailTemplate } from "./template";
import { ISmtp } from "./Ismtp";

export class Smtp implements ISmtp {
    private readonly transporter: Transporter;
    private _email: SendMailOptions | undefined;
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT!),
            secure: true,
            authMethod: "PLAIN",
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD,
            },
        });
        console.log(this.transporter);
    }

    async sendEmail(email: string, subject: string, message: string) {
        const html = emailTemplate(message);
        this._email = {
            from: process.env.SMTP_USERNAME,
            to: email,
            subject: subject,
            html: html,
        };

        await new Promise((resolve, reject) => {
            this.transporter.sendMail(this._email!, (error, info) => {
                if (error) {
                    console.error("Error sending email", error);
                    reject();
                } else {
                    console.log("Email sent successfully", info.response);
                    resolve(info.response);
                }
            });
        });
    }

    get email() {
        return this._email;
    }
}
