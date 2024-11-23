import "dotenv/config";
import SignInResponse from '../responses/signInResponse';
import { IUser } from '../../../models/user';
import ITokenService from '../../../services/token/itokenService';
import { inject, injectable } from "inversify";
import "reflect-metadata";

@injectable()
export default class GenerateTokenFromUserCase {
    private readonly tokenExpires = process.env.TOKEN_EXPIRES!;
    private readonly refreshTokenExpires = process.env.REFRESH_TOKEN_EXPIRES!;
    private readonly tokenService: ITokenService;

    constructor(
        @inject('TokenService') tokenService: ITokenService) {
        this.tokenService = tokenService;
    }

    async execute(user: IUser) : Promise<SignInResponse> {
        const expireTime = new Date(new Date().toUTCString());
        const expiresInHours = parseInt(this.tokenExpires);
        expireTime.setHours(expireTime.getHours() + expiresInHours);

        const id = user.id!.toString();
        const accessToken = this.tokenService.create(id, this.tokenExpires);
        const refreshToken = this.tokenService.create(id, this.refreshTokenExpires);

        const response: SignInResponse = {
            accessToken: accessToken,
            refreshToken: refreshToken,
            accessTokenExpiresAtUtc: expireTime,
        };

        return response;
    }
}