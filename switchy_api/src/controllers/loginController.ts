import { Request, Response } from "express";
import { StatusCodes } from '../utils/status_codes';
import "dotenv/config";
import jwtMiddleware from "../middleware/jwtMiddleware";

export default class LoginController {
    private readonly tokenExpires = process.env.TOKEN_EXPIRES!;
    private readonly refreshTokenExpires = process.env.REFRESH_TOKEN_EXPIRES!;

    async signIn(req: Request, res: Response) {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(StatusCodes.BadRequest).send();
            return;
        }

        // TODO: Get User by Email and Password

        const expireTime = new Date(new Date().toUTCString());
        const expiresInHours = parseInt(this.tokenExpires);
        expireTime.setHours(expireTime.getHours() + expiresInHours);

        const id = "1";
        const accessToken = jwtMiddleware.createJWT(id, this.tokenExpires);
        const refreshToken = jwtMiddleware.createJWT(id, this.refreshTokenExpires);

        const response = {
            access_token: accessToken,
            refresh_token: refreshToken,
            access_token_expires_at_utc: expireTime,
        };

        res.type("application/json").status(StatusCodes.Ok).send(response);
    }
}