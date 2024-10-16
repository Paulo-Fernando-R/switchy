import { Request, Response } from "express";
import { IUser } from "../models/user";
import UserRepository from "../repositories/userRepository/userRepository";
import ServerError from "../errors/serverError";

export default class UserController {
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

            res.type("application/json").status(200).send(newUser);
        } catch (error) {
            console.error(error);
            if (error instanceof ServerError) res.status(error.code).send(error.message);
        }
    }
}
