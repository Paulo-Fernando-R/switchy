import { Request, Response } from "express";
import { IUser } from "../models/user";
import UserRepository from "../repositories/userRepository/userRepository";
import ServerError from "../errors/serverError";
import { StatusCodes } from "../utils/status_codes";
import { EmailAlreadyTaken, SignUpError } from "../domain/auth/errors/signup_errors";
import bcrypt from "bcrypt";
export default class UserController {
    async signUp(request: Request, response: Response) {
        const { name, email, password } = request.body;
    
        if (!name || !email || !password) {
            response.status(StatusCodes.Created).send("Missing Required fields.");
            return;
        }
        try {
    
            const emailAlreadyTaken = await UserRepository.getByEmail(email);
    
            if(emailAlreadyTaken != null){
                throw new EmailAlreadyTaken("Email already taken.", StatusCodes.BadRequest);
            }
    
            let hashedPassword = '';
            const saltRounds: any = process.env.ENCRYPT_SALT;
            
    
            bcrypt.genSalt(saltRounds, (err: any, salt: any) => {
                bcrypt.hash(password, salt, (err: any, hash: any) => {
                    hashedPassword = hash;
                })
            })
    
            const user: IUser = {
                email: email,
                name: name,
                password: hashedPassword,
            };
    
            const newUser = await UserRepository.createUser(user);
    
            response.type("application/json").status(StatusCodes.Created).send(newUser);
    
        } catch (error) {
            if (error instanceof SignUpError) response.status(error.code).send(error.message);
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
            const newUser = await UserRepository.createUser(user);

            res.type("application/json").status(200).send(newUser);
        } catch (error) {
            console.error(error);
            if (error instanceof ServerError) res.status(error.code).send(error.message);
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const newUser = await UserRepository.getUserById(req.userId);

            res.type("application/json").status(StatusCodes.Ok).send(newUser);
        } catch (error) {
            console.error(error);
            if (error instanceof ServerError) res.status(error.code).send(error.message);
        }
    }
}
