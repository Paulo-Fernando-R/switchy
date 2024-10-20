import { Request, Response } from "express";
import { IUser } from "../models/user";
import { UserRepository } from "../repositories/userRepository/userRepository";
import ServerError from "../errors/serverError";
import { StatusCodes } from "../utils/status_codes";
import { EmailAlreadyTaken, SignUpError } from "../domain/auth/errors/signup_errors";
import bcrypt from "bcrypt";
import IUserRepository from "../repositories/userRepository/IuserRepository";
import SignUpCase from "../domain/user/cases/signUpCase";
import EncryptServiceBcrypt from "../services/encrypt/encryptService";
import SignUpRequest from "../domain/user/requests/signUpRequest";
import { UserError, UserNotFoundError } from "../domain/user/errors/userErrors";
import GetUserByIdCase from "../domain/user/cases/getUserByIdCase";

export default class UserController {
    private userRepository: IUserRepository;
    private signUpCase: SignUpCase;
    private encryptService: EncryptServiceBcrypt;

    constructor() {
        this.userRepository = new UserRepository();
        this.encryptService = new EncryptServiceBcrypt();
        this.signUpCase = new SignUpCase(this.userRepository, this.encryptService);
    }

    async signUp(request: Request, response: Response) {
        try {

            const signUpRequest: SignUpRequest = request.body
            const newUser = await this.signUpCase.execute(signUpRequest);
            response.type("application/json").status(StatusCodes.Created).send(newUser);

        } catch (error) {
            if (error instanceof UserError) response.status(error.statusCode).send(error.message);
            else throw error
        }
    }

    async newUser(req: Request, res: Response) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(400).send("all properties are required");
            return;
        }

        const user: IUser = {
            email: email,
            name: name,
            password: password,
        };

        try {
            const newUser = await this.userRepository.createUser(user);

            res.type("application/json").status(200).send(newUser);
        } catch (error) {
            console.error(error);
            if (error instanceof ServerError) res.status(error.code).send(error.message);
        }
    }

    async getInfo(req: Request, res: Response) {
        try {
            const userInfo = await new GetUserByIdCase(this.userRepository).execute(req.userId);

            res.type("application/json").status(StatusCodes.Ok).send(userInfo);
        } catch (ex) {
            if (ex instanceof UserNotFoundError) {
                res.status(StatusCodes.NotFound).send();
                return;
            }

            throw ex;
        }
    }
}
