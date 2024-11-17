"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoveryEmail = void 0;
const smtp_1 = require("./smtp");
const template_1 = require("./template");
class RecoveryEmail extends smtp_1.Smtp {
    constructor() {
        super();
    }
    sendEmail(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const html = (0, template_1.emailTemplate)(password);
            this.email = {
                from: process.env.SMTP_USERNAME,
                to: email,
                subject: "Recuperação de senha Switchy",
                html: html,
            };
            try {
                yield new Promise((resolve, reject) => {
                    this.transporter.sendMail(this.email, (error, info) => {
                        if (error) {
                            console.error("Error sending email", error);
                            reject(error);
                        }
                        else {
                            console.log("Email sent successfully", info.response);
                            resolve(info.response);
                        }
                    });
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.RecoveryEmail = RecoveryEmail;
