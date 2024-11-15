import { IUser } from "../../../models/user";
import IUserRepository from "../../../repositories/userRepository/IuserRepository";
import { UserInvalidEmailError } from "../errors/userErrors";

export default class GetUserByEmailCase {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(email: string): Promise<IUser> {
        if(email == null || email == '') {
            throw new UserInvalidEmailError();
        }
        const user: any = this.userRepository.getByEmail(email) ?? null;
        return await user;
    }
}