import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import { StatusCodes } from "../utils/status_codes";
import ITokenService from "../services/token/itokenService";
import UserIsDeletedCase from "../domain/user/cases/userIsDeletedCase";
import container from "../injection";

export async function jwtMiddleware(request: Request, response: Response, next: NextFunction) {
    let token = request.headers["authorization"];

    if (!token) {
        response.status(StatusCodes.Unauthorized).end();
        return;
    }

    const tokenService = container.get<ITokenService>('TokenService');
    const userIsDeletedCase = container.get<UserIsDeletedCase>('UserIsDeletedCase');;

    const reg = new RegExp(/Bearer/i);
    if (reg.test(token)) {
        token = token.split(" ")[1];
    }

    try {
        const decoded = tokenService.isValid(token);
        const userId = decoded.userId;

        const isDeleted = await userIsDeletedCase.execute(userId);
        if (isDeleted) {
            response.status(StatusCodes.Unauthorized).end();
            return;
        }

        request.userId = userId;
        next();
    } catch (ex) {
        console.log(ex);
        response.status(StatusCodes.Unauthorized).end();
        return;
    }
}
