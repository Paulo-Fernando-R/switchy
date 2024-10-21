import Auth from "../../models/auth";

export default interface IRefreshTokenService{
    execute(token: string): Promise<Auth>
}