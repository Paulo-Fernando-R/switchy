import { Request, Response } from "express";
import { StatusCodes } from '../utils/status_codes';
import GetUserByEmailPasswordCase from "../domain/user/cases/getUserByEmailPasswordCase";
import { UserError, UserNotFoundError } from "../domain/user/errors/userErrors";
import GenerateTokenFromUserCase from "../domain/auth/cases/generateTokenFromUserCase";
import GetUserFromTokenCase from "../domain/auth/cases/getUserFromTokenCase";
import { AuthEmptyFieldsError, AuthInvalidTokenError } from "../domain/auth/errors/authErrors";
import ITokenService from "../services/token/itokenService";
import JwtTokenService from "../services/token/jwtTokenService";
import IUserRepository from "../repositories/userRepository/IuserRepository";
import UserRepository from "../repositories/userRepository/userRepository";

export default class LoginController {
    private readonly tokenService: ITokenService;
    private readonly userRepository: IUserRepository;
    
    constructor() {
        this.tokenService = new JwtTokenService();
        this.userRepository = new UserRepository();
    }

    async signIn(req: Request, res: Response) {
        const { email, password} = req.body;

        try {
            const user = await new GetUserByEmailPasswordCase(this.userRepository).execute(email, password);
            const response = await new GenerateTokenFromUserCase(this.tokenService).execute(user);

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
            const user = await new GetUserFromTokenCase(this.userRepository, this.tokenService).execute(token);
            const response = await new GenerateTokenFromUserCase(this.tokenService).execute(user);

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