import Auth from "../../models/auth";

export default interface ISignUpCase {
    execute(name: string, username: string, email: string, password: string): Promise<Auth>;
}
