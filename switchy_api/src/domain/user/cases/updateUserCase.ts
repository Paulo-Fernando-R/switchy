import IUserRepository from "../../../repositories/userRepository/IuserRepository";
import { StatusCodes } from "../../../utils/status_codes";
import { UserInvalidEmailError } from "../errors/userErrors";

export default class UpdateUserCase {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(userId: string, name: string, email: string, description: string) {
        const emailAlreadyTaken = await this.userRepository.getByEmail(email);
        if (emailAlreadyTaken != null) {
            throw new UserInvalidEmailError("Email already taken.", StatusCodes.BadRequest);
        }

        const res = await this.userRepository.update(userId, name, email, description);
        return res;
    }
}
