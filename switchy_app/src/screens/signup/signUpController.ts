import ISignUpCase from "../../cases/signUpCase/IsignUpCase";
import SignUpCase from "../../cases/signUpCase/signUpCase";
import Auth from "../../models/auth";

export default class SignUpController {
    private readonly signUpCase: ISignUpCase;

    constructor() {
        this.signUpCase = new SignUpCase();
    }

    async signUp(name: string, username: string, email: string, password: string, setAuth: (value: Auth) => void) {
        const res = await this.signUpCase.execute(name, username, email, password);

        setAuth(res);
        return res;
    }
}