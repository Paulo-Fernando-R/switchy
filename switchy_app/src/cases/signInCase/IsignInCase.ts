import Auth from "../../models/auth";

export default interface ISignInCase {
    execute(email: string, password: string): Promise<Auth>;
}
