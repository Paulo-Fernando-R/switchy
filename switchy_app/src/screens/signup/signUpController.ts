import ISignUpCase from "../../cases/signUpCase/IsignUpCase";
import SignUpCase from "../../cases/signUpCase/signUpCase";
import Auth from "../../models/auth";

export default class SignUpController {
    private readonly signUpCase: ISignUpCase;

    constructor() {
        this.signUpCase = new SignUpCase();
    }

    async signUp(name: string, username: string, email: string, password: string, setAuth: (value: Auth) => void) {
        // if (!email || !password || !username || !name) {
        //     return;
        // }

        //const reg = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$");
        // if (!reg.test(email)) {
        //     return;
        // }

        // if (password.length < 6) {
        //     return;
        // }

        // if(username.length < 3) {
        //     return;
        // }

        const res = await this.signUpCase.execute(name, username, email, password);

        setAuth(res);
        return res;
    }
}
