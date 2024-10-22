import ISignInCase from "../../cases/signInCase/IsignInCase";
import SignInCase from "../../cases/signInCase/signInCase";
import Auth from "../../models/auth";

export default class LoginController {
    private readonly signIncase: ISignInCase;

    constructor() {
        this.signIncase = new SignInCase();
    }

    async signIn(email: string, password: string, setAuth: (value: Auth) => void) {
        const res = await this.signIncase.execute(email, password);
        setAuth(res);
        return res;
    }
}
