import ISignInCase from "../../cases/signInCase/IsignInCase";
import SignInCase from "../../cases/signInCase/signInCase";
import Auth from "../../models/auth";

export default class LoginController {
    private readonly signIncase: ISignInCase;

    constructor() {
        this.signIncase = new SignInCase();
    }

    async signIn(email: string, password: string, setAuth: (value: Auth) => void) {
        if (!email || !password) return;
        //const reg = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$");
        // if (!reg.test(email)) {
        //throw new Error("Email inválido");
        // }

        // if (password.length < 6) {
        //     return;
        // }

        const res = await this.signIncase.execute(email, password);
        setAuth(res);
        return res;
    }
}
