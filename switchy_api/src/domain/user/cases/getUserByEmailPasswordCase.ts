import emailValidator from 'email-validator';
import IUserRepository from '../../../repositories/userRepository/IuserRepository';
import { IUser } from '../../../models/user';
import { UserEmptyFieldsError, UserInvalidEmailError, UserInvalidPasswordError, UserNotFoundError } from '../errors/userErrors';

export default class GetUserByEmailPasswordCase {
    private readonly userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(email: string, password: string) : Promise<IUser> {
        if (!email || !password) {
            throw new UserEmptyFieldsError();
        }

        // const isValidEmail = emailValidator.validate(email);
        // if (!isValidEmail) {
        //     throw new UserInvalidEmailError();
        // }

        // if (password.length < 8 || password.length > 16) {
        //     throw new UserInvalidPasswordError();
        // }

        const user = await this.userRepository.getByEmailAndPassword(email, password);
        if (user == null) {
            throw new UserNotFoundError();
        }

        return user;
    }
}