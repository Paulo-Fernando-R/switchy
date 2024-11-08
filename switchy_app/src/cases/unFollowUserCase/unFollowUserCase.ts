import { CustomError } from "../../errors/customErrors";
import IUserRepository from "../../repositories/userRepository/IuserRepository";
import UserRepository from "../../repositories/userRepository/userRepository";
import IUnFollowUserCase from "./IunFollowUserCase";

export default class UnFollowUserCase implements IUnFollowUserCase {
    private readonly repository: IUserRepository;
    constructor() {
        this.repository = new UserRepository();
    }
    async execute(userId: string) {
        try {
            await this.repository.unFollowUser(userId);
        } catch (error) {
            console.error(error);
            if (error instanceof CustomError) {
                throw new Error(error.screenMessage);
            }
        }
    }
}
