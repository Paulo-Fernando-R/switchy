import ISignUpCase from "../../cases/signUpCase/IsignUpCase";
import SignUpCase from "../../cases/signUpCase/signUpCase";
import Auth from "../../models/auth";

export default class SignUpController {
    private readonly signUpCase: ISignUpCase;

    constructor() {
        this.signUpCase = new SignUpCase();
    }

    async signUp(name: string, username: string, email: string, password: string, setAuth: (value: Auth) => void) {
        if (!email || !password || !username || !name) {
            throw new Error("Todos os campos devem ser preenchidos");
        }

        const reg = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$");
        if (!reg.test(email)) {
            throw new Error("Email inválido");
        }

        if (password.length < 6) {
            throw new Error("Senha deve ter pelo menos 6 caracteres");
        }

        if (username.length < 3) {
            throw new Error("Nome de usuário deve ter pelo menos 3 caracteres");
        }

        const res = await this.signUpCase.execute(name, username, email, password);
        console.log(res);
        setAuth(res);
        return res;
    }
}
