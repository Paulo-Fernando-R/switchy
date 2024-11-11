import IUserRepository from "../../../repositories/userRepository/IuserRepository";
import { UserInvalidUsernameError } from "../errors/userErrors";

export default class UpdateUsernameCase {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(userId: string, newUsername: string): Promise<void> {
        var userWithUsername = await this.userRepository.getByUsername(newUsername);
        if (userWithUsername) {
            throw new UserInvalidUsernameError('Invalid Username');
        }

        await this.userRepository.updateUsername(userId, newUsername);
    }
}