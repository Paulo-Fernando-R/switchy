import { RecoveryEmail } from "../../../services/smtp/recoveryEmail";

export default class SendRecoveryPasswordEmailCase {
    private recoveryEmail: RecoveryEmail;

    constructor(recoveryEmail: RecoveryEmail) {
        this.recoveryEmail = recoveryEmail;
    }

    async execute(email: string, newPassword: string): Promise<void> {
        this.recoveryEmail.sendEmail(email, newPassword);
    }
}