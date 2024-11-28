import "reflect-metadata";
import { inject, injectable } from "inversify";
import IUserRepository from "../../../repositories/userRepository/IuserRepository";
import { UserNotFoundError } from "../errors/userErrors";

@injectable()
export default class UserIsDeletedCase {
    private readonly userRepository: IUserRepository;

    constructor(@inject('UserRepository') userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(userId: string): Promise<boolean> {
        const user = await this.userRepository.getById(userId);
        if (user == null) {
            throw new UserNotFoundError();
        }

        const deleted = user.deleted;
        return deleted ?? false;
    }
}