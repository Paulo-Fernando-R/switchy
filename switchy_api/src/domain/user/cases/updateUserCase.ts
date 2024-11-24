import { IUser } from "../../../models/user";
import IUserRepository from "../../../repositories/userRepository/IuserRepository";
import { StatusCodes } from "../../../utils/status_codes";
import { UserInvalidEmailError } from "../errors/userErrors";
import { inject, injectable } from "inversify";
import "reflect-metadata";

@injectable()
export default class UpdateUserCase {
    private userRepository: IUserRepository;

    constructor(@inject('UserRepository') userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(userId: string, name: string, email: string, description: string): Promise<IUser> {
        const emailAlreadyTaken = await this.userRepository.getByEmail(email);
        if (emailAlreadyTaken != null && userId != emailAlreadyTaken.id?.toString()) {
            throw new UserInvalidEmailError("Email already taken.", StatusCodes.BadRequest);
        }

        const res = await this.userRepository.update(userId, name, email, description);
        if (res == null) throw Error();

        return res;
    }
}
