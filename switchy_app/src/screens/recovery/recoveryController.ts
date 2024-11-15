import IPasswordRecoveryCase from "../../cases/passwordRecoveryCase/IpasswordRecoveryCase";
import PasswordRecoveryCase from "../../cases/passwordRecoveryCase/passwordRecoveryCase";

export default class LoginController {
    private readonly passwordRecoveryCase: IPasswordRecoveryCase;

    constructor() {
        this.passwordRecoveryCase = new PasswordRecoveryCase();
    }

    async signIn(email: string) {
        await this.passwordRecoveryCase.execute(email);
    }
}
