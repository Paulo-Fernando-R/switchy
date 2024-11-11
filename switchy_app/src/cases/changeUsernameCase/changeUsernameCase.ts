import { CustomError, MissingData } from "../../errors/customErrors";
import User from "../../models/user";
import IUserRepository from "../../repositories/userRepository/IuserRepository";
import UserRepository from "../../repositories/userRepository/userRepository";

export default class ChangeUsernameCase {
    private readonly repository: IUserRepository;
    constructor() {
        this.repository = new UserRepository();
    }
    async execute(user: User, isValid: boolean) {
        try {
            const isEmpty = Object.values(user).every((value) => !value);

            if (!isValid || isEmpty) {
                throw new MissingData(400, "", "Informe o novo nome de usuário");
            }
            await this.repository.chnageUsername(user.userName);
        } catch (error) {
            console.error(error);
            if (error instanceof CustomError) {
                throw new Error(error.screenMessage);
            }
        }
    }
}
