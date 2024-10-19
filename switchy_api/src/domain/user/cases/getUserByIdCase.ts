import { IUser } from "../../../models/user";
import IUserRepository from "../../../repositories/userRepository/IuserRepository";
import { UserNotFoundError } from "../errors/userErrors";

export default class GetUserByIdCase {
    private readonly userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(userId: string): Promise<IUser> {
        const user = await this.userRepository.getUserById(userId);
        if (user == null) {
            throw new UserNotFoundError();
        }

        return user;
    }
}