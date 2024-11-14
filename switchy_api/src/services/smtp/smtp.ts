import nodemailer, { Transporter, SendMailOptions } from "nodemailer";
import { ISmtp } from "./Ismtp";

export class Smtp implements ISmtp {
    private readonly _transporter: Transporter;
    private _email: SendMailOptions | undefined;
    constructor() {
        this._transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT!),
            secure: true,
            authMethod: "PLAIN",
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD,
            },
        });
        console.log(this._transporter);
    }

    async sendEmail(email: string, subject: string, message: string) {
        this._email = {
            from: process.env.SMTP_USERNAME,
            to: email,
            subject: subject,
            html: message,
        };

        await new Promise((resolve, reject) => {
            this._transporter.sendMail(this._email!, (error, info) => {
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
    get transporter() {
        return this._transporter;
    }

    get email() {
        return this._email;
    }
    set email(email: SendMailOptions | undefined) {
        this._email = email;
    }
}
