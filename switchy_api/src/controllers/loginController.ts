import { Request, Response } from "express";
import { StatusCodes } from '../utils/status_codes';
import SignInCase from "../domain/auth/cases/sign_in_case";
import { AuthError, AuthNotFoundError } from "../domain/auth/errors/auth_errors";
import userRepository from "../repositories/userRepository/userRepository";

export default class LoginController {
    async signIn(req: Request, res: Response) {
        const { email, password} = req.body;

        try {
            const response = await new SignInCase(userRepository).execute(email, password);
            res.type("application/json").status(StatusCodes.Ok).send(response);
        } catch (ex) {
            if (ex instanceof AuthNotFoundError) {
                res.status(StatusCodes.NotFound).send();
                return;
            } else if (ex instanceof AuthError) {
                res.status(StatusCodes.BadRequest).send();
                return;
            }

            throw ex;
        }
    }
}