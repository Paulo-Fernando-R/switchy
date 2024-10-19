import { Request, Response } from "express";
import { StatusCodes } from '../utils/status_codes';
import "dotenv/config";
import jwtMiddleware from "../middleware/jwtMiddleware";
import userRepository from "../repositories/userRepository/userRepository";
import emailValidator from 'email-validator';

export default class LoginController {
    private readonly tokenExpires = process.env.TOKEN_EXPIRES!;
    private readonly refreshTokenExpires = process.env.REFRESH_TOKEN_EXPIRES!;

    async signIn(req: Request, res: Response) {
        const { email, password} = req.body;

        if (!email || !password) {
            res.status(StatusCodes.BadRequest).send();
            return;
        }

        const isValidEmail = emailValidator.validate(email);
        if (!isValidEmail) {
            res.status(StatusCodes.BadRequest).send();
            return;
        }

        if (password.length < 8 || password.length > 16) {
            res.status(StatusCodes.BadRequest).send();
            return;
        }

        const user = await userRepository.getByEmailAndPassword(email, password);
        if (user == null) {
            res.status(StatusCodes.NotFound).send();
            return;
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

        res.type("application/json").status(StatusCodes.Ok).send(response);
    }
}