import { IUser } from "../../../models/user";
import IUserRepository from "../../../repositories/userRepository/IuserRepository";
import { UserInvalidUsernameError } from "../errors/userErrors";

export default class UpdateUsernameCase {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
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