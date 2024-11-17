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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Smtp = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class Smtp {
    constructor() {
        this._transporter = nodemailer_1.default.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT),
            secure: true,
            authMethod: "PLAIN",
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }
    sendEmail(email, subject, message) {
        return __awaiter(this, void 0, void 0, function* () {
            this._email = {
                from: process.env.SMTP_USERNAME,
                to: email,
                subject: subject,
                html: message,
            };
            yield new Promise((resolve, reject) => {
                this._transporter.sendMail(this._email, (error, info) => {
                    if (error) {
                        console.error("Error sending email", error);
                        reject();
                    }
                    else {
                        console.log("Email sent successfully", info.response);
                        resolve(info.response);
                    }
                });
            });
        });
    }
    get transporter() {
        return this._transporter;
    }
    get email() {
        return this._email;
    }
    set email(email) {
        this._email = email;
    }
}
exports.Smtp = Smtp;
