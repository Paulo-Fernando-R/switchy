import { IUser } from "../../../models/user";
import IUserRepository from "../../../repositories/userRepository/IuserRepository";
import { UserEmptyFieldsError, UserInvalidEmailError, UserInvalidUsernameError } from "../errors/userErrors";
import IEncryptService from "../../../services/encrypt/iencryptService";
import SignUpRequest from "../requests/signUpRequest";

export default class SignUpCase {
    private readonly userRepository: IUserRepository;
    private readonly encryptService: IEncryptService;

    constructor(userRepository: IUserRepository, encryptService: IEncryptService) {
        this.userRepository = userRepository;
        this.encryptService = encryptService;
    }

    async execute(newUserData: SignUpRequest): Promise<IUser> {
        if (!newUserData.name || !newUserData.email || !newUserData.password) {
            throw new UserEmptyFieldsError();
        }

        const emailAlreadyTaken = await this.userRepository.getByEmail(newUserData.email);
        if (emailAlreadyTaken != null) {
            throw new UserInvalidEmailError();
        }

        const usernameAlreadyTaken = await this.userRepository.getByUsername(newUserData.userName);
        if (usernameAlreadyTaken != null) {
            throw new UserInvalidUsernameError();
        }

        newUserData.password = await this.encryptService.hashPassword(newUserData.password);

        const user: IUser = {
            email: newUserData.email,
            name: newUserData.name,
            password: newUserData.password,
            userName: newUserData.userName,
        };

        return await this.userRepository.createUser(user);
    }
}
