import { IUser } from "../../../models/user";
import IUserRepository from "../../../repositories/userRepository/IuserRepository";
import { UserInvalidUsernameError } from "../errors/userErrors";
import { inject, injectable } from "inversify";
import "reflect-metadata";

@injectable()
export default class UpdateUsernameCase {
    private userRepository: IUserRepository;

    constructor(@inject('UserRepository') userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(userId: string, newUsername: string): Promise<IUser> {
        var userWithUsername = await this.userRepository.getByUsername(newUsername);
        if (userWithUsername) {
            throw new UserInvalidUsernameError('Invalid Username');
        }

        var userUpdated = await this.userRepository.updateUsername(userId, newUsername);
        if (userUpdated == null) throw new Error();

        return userUpdated;
    }
}