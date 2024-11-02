import { Request, Response } from "express";
import { IUser } from "../models/user";
import { UserRepository } from "../repositories/userRepository/userRepository";
import ServerError from "../errors/serverError";
import { StatusCodes } from "../utils/status_codes";
import IUserRepository from "../repositories/userRepository/IuserRepository";
import SignUpCase from "../domain/user/cases/signUpCase";
import EncryptServiceBcrypt from "../services/encrypt/encryptService";
import SignUpRequest from "../domain/user/requests/signUpRequest";
import { UserError, UserNotFoundError } from "../domain/user/errors/userErrors";
import GetUserByIdCase from "../domain/user/cases/getUserByIdCase";
import SearchUserCase from "../domain/user/cases/searchUserCase";
import UpdateUserCase from "../domain/user/cases/updateUserCase";
import ChangeUserPasswordCase from "../domain/user/cases/ChangePasswordCase";

export default class UserController {
    private userRepository: IUserRepository;
    private signUpCase: SignUpCase;
    private encryptService: EncryptServiceBcrypt;
    private searchUserCase: SearchUserCase;
    private getUserByIdCase: GetUserByIdCase;
    private updateUserCase: UpdateUserCase;
    private changeUserPasswordCase: ChangeUserPasswordCase;


    constructor() {
        this.userRepository = new UserRepository();
        this.encryptService = new EncryptServiceBcrypt();
        this.signUpCase = new SignUpCase(this.userRepository, this.encryptService);
        this.searchUserCase = new SearchUserCase(this.userRepository, this.encryptService);
        this.getUserByIdCase = new GetUserByIdCase(this.userRepository);
        this.updateUserCase = new UpdateUserCase(this.userRepository);
        this.changeUserPasswordCase = new  ChangeUserPasswordCase(this.userRepository, this.encryptService);

    }

    async signUp(request: Request, response: Response) {
        try {
            const { name, email, password, userName } = request.body;
            const signUpRequest = { name, email, password, userName } as SignUpRequest;

            const newUser = await this.signUpCase.execute(signUpRequest);
            response.type("application/json").status(StatusCodes.Created).send(newUser);
        } catch (error) {
            if (error instanceof UserError) response.status(error.statusCode).send(error.message);
            else throw error;
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

    async searchUser(req: Request, res: Response) {
        const { query } = req.params;
        try {
            const userInfo = await this.searchUserCase.execute(query);

            res.type("application/json").status(StatusCodes.Ok).send(userInfo);
        } catch (ex) {
            res.status(StatusCodes.InternalServerError).send();
        }
    }

    async update(req: Request, res: Response) {
        const { name, email, password, userName } = req.body;
        const userId = req.userId;

        try {
            this.getUserByIdCase.execute(userId);
            this.updateUserCase.execute(userId, name, email, password, userName);

            return res.type("application/json").status(StatusCodes.Ok).send();
        } catch (ex) {
            if (ex instanceof UserNotFoundError) {
                return res.status(StatusCodes.NotFound).send();
            }

            throw ex;
        }
    }
    async changePassword(req: Request, res: Response) {
        const { oldPassword, newPassword } = req.body;

        try {

            this.changeUserPasswordCase.execute(req.userId, oldPassword, newPassword);

            return res.type("application/json").status(StatusCodes.Ok).send();
        } catch (ex) {
            if (ex instanceof UserNotFoundError) {
                return res.status(StatusCodes.NotFound).send();
            }

            throw ex;
        }
    }
}
