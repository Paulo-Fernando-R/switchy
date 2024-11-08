import { CustomError } from "../../errors/customErrors";
import IUserRepository from "../../repositories/userRepository/IuserRepository";
import UserRepository from "../../repositories/userRepository/userRepository";
import IfollowUserCase from "./IfollowUsercase";

export default class FollowUserCase implements IfollowUserCase {
    private readonly repository: IUserRepository;
    constructor() {
        this.repository = new UserRepository();
    }
    async execute(userId: string) {
        try {
            await this.repository.followUser(userId);
        } catch (error) {
            console.error(error);
            if (error instanceof CustomError) {
                throw new Error(error.screenMessage);
            }
        }
    }
}
