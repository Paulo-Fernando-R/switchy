import Auth from "../../models/auth";

export default interface IAuthRepository{
    login(email: string, password: string): Promise<Auth>
    signUp(name: string, username: string, email: string, password: string): Promise<Auth>
}

