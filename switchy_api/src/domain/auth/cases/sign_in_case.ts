import emailValidator from 'email-validator';
import userRepository from '../../../repositories/userRepository/userRepository';
import jwtMiddleware from '../../../middleware/jwtMiddleware';
import "dotenv/config";
import { AuthEmptyFieldsError, AuthInvalidEmailError, AuthInvalidPasswordError, AuthNotFoundError } from '../errors/auth_errors';

export default class SignInCase {
    private readonly tokenExpires = process.env.TOKEN_EXPIRES!;
    private readonly refreshTokenExpires = process.env.REFRESH_TOKEN_EXPIRES!;

    async execute(email: string, password: string) {
        if (!email || !password) {
            throw new AuthEmptyFieldsError();
        }

        const isValidEmail = emailValidator.validate(email);
        if (!isValidEmail) {
            throw new AuthInvalidEmailError();
        }

        if (password.length < 8 || password.length > 16) {
            throw new AuthInvalidPasswordError();
        }

        const user = await userRepository.getByEmailAndPassword(email, password);
        if (user == null) {
            throw new AuthNotFoundError();
        }

        const expireTime = new Date(new Date().toUTCString());
        const expiresInHours = parseInt(this.tokenExpires);
        expireTime.setHours(expireTime.getHours() + expiresInHours);

        const id = user.id!.toString();
        const accessToken = jwtMiddleware.createJWT(id, this.tokenExpires);
        const refreshToken = jwtMiddleware.createJWT(id, this.refreshTokenExpires);

        const response = {
            access_token: accessToken,
            refresh_token: refreshToken,
            access_token_expires_at_utc: expireTime,
        };

        return response;
    }
}