import { Request, Response } from "express";
import { StatusCodes } from '../utils/status_codes';
import userRepository from "../repositories/userRepository/userRepository";
import GetUserByEmailPasswordCase from "../domain/user/cases/getUserByEmailPasswordCase";
import { UserError, UserNotFoundError } from "../domain/user/errors/userErrors";
import GenerateTokenFromUserCase from "../domain/auth/cases/generateTokenFromUserCase";
import GetUserFromTokenCase from "../domain/auth/cases/getUserFromTokenCase";
import { AuthEmptyFieldsError, AuthInvalidTokenError } from "../domain/auth/errors/authErrors";

export default class LoginController {
    async signIn(req: Request, res: Response) {
        const { email, password} = req.body;

        try {
            const user = await new GetUserByEmailPasswordCase(userRepository).execute(email, password);
            const response = await new GenerateTokenFromUserCase().execute(user);

            res.type("application/json").status(StatusCodes.Ok).send(response);
        } catch (ex) {
            if (ex instanceof UserNotFoundError) {
                res.status(StatusCodes.NotFound).send();
                return;
            } else if (ex instanceof UserError) {
                res.status(StatusCodes.BadRequest).send();
                return;
            }

            throw ex;
        }
    }

    async refreshToken(req: Request, res: Response) {
        const { token } = req.body;

        try {
            const user = await new GetUserFromTokenCase(userRepository).execute(token);
            const response = await new GenerateTokenFromUserCase().execute(user);

            res.type("application/json").status(StatusCodes.Ok).send(response);
        } catch (ex) {
            if (ex instanceof AuthInvalidTokenError) {
                res.status(StatusCodes.Forbidden).send();
                return;
            } else if (ex instanceof UserNotFoundError) {
                res.status(StatusCodes.NotFound).send();
                return;
            } else if (ex instanceof AuthEmptyFieldsError) {
                res.status(StatusCodes.BadRequest).send();
                return;
            }

            throw ex;
        }
        
    }
}