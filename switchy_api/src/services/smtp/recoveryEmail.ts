import { Smtp } from "./smtp";
import { emailTemplate } from "./template";

export class RecoveryEmail extends Smtp {
    constructor() {
        super();
    }
    async sendEmail(email: string, password: string) {
        const html = emailTemplate(password);
        this.email = {
            from: process.env.SMTP_USERNAME,
            to: email,
            subject: "Recuperação de senha Switchy",
            html: html,
        };

        try {
            await new Promise((resolve, reject) => {
                this.transporter.sendMail(this.email!, (error, info) => {
                    if (error) {
                        console.error("Error sending email", error);
                        reject(error);
                    } else {
                        console.log("Email sent successfully", info.response);
                        resolve(info.response);
                    }
                });
            });
        } catch (error) {
            throw error;
        }
    }
}
