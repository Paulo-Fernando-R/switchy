import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import { StatusCodes } from "../utils/status_codes";
import ITokenService from "../services/token/itokenService";
import JwtTokenService from "../services/token/jwtTokenService";

export function jwtMiddleware(request: Request, response: Response, next: NextFunction) {
    let token = request.headers["authorization"];

    if (!token) {
        response.status(StatusCodes.Unauthorized).end();
        return;
    }

    const tokenService: ITokenService = new JwtTokenService();
    const reg = new RegExp(/Bearer/i);
    if (reg.test(token)) {
        token = token.split(" ")[1];
    }

    try {
        const decoded = tokenService.isValid(token);

        request.userId = decoded.userId;
        next();
    } catch (ex) {
        console.log(ex);
        response.status(StatusCodes.Unauthorized).end();
        return;
    }
}
