import jwtMiddleware from '../../../middleware/jwtMiddleware';
import "dotenv/config";
import SignInResponse from '../responses/signInResponse';
import { IUser } from '../../../models/user';

export default class GenerateTokenFromUserCase {
    private readonly tokenExpires = process.env.TOKEN_EXPIRES!;
    private readonly refreshTokenExpires = process.env.REFRESH_TOKEN_EXPIRES!;

    async execute(user: IUser) : Promise<SignInResponse> {
        const expireTime = new Date(new Date().toUTCString());
        const expiresInHours = parseInt(this.tokenExpires);
        expireTime.setHours(expireTime.getHours() + expiresInHours);

        const id = user.id!.toString();
        const accessToken = jwtMiddleware.createJWT(id, this.tokenExpires);
        const refreshToken = jwtMiddleware.createJWT(id, this.refreshTokenExpires);

        const response: SignInResponse = {
            access_token: accessToken,
            refresh_token: refreshToken,
            access_token_expires_at_utc: expireTime,
        };

        return response;
    }
}