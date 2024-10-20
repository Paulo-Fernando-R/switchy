import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import { StatusCodes } from "../utils/status_codes";
import ITokenService from "../services/token/itokenService";
import JwtTokenService from "../services/token/jwtTokenService";

export function jwtMiddleware(request: Request, response: Response, next: NextFunction) {
    const token = request.headers["authorization"];
    if (!token) {
        response.status(StatusCodes.Unauthorized).end();
        next();
    }

    const tokenService: ITokenService = new JwtTokenService();

    try {
        const decoded = tokenService.isValid(token!);
        request.userId = decoded.userId;
    } catch (ex) {
        response.status(StatusCodes.Unauthorized).end();
    }

    next();
}