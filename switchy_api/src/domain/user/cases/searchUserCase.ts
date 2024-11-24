import { IUser } from "../../../models/user";
import IUserRepository from "../../../repositories/userRepository/IuserRepository";
import { UserEmptyFieldsError } from "../errors/userErrors";
import { StatusCodes } from "../../../utils/status_codes";
import ServerError from "../../../errors/serverError";
import { inject, injectable } from "inversify";
import "reflect-metadata";

@injectable()
export default class SearchUserCase {
    private readonly userRepository: IUserRepository;

    constructor(@inject('UserRepository') userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(query: string): Promise<IUser[]> {
        if (!query) {
            throw new UserEmptyFieldsError("Missing required fields", StatusCodes.BadRequest);
        }

        try {
            const response = await this.userRepository.searchUser(query);
            return response;
        } catch (error) {
            console.error(error);
            throw new ServerError();
        }
    }
}
