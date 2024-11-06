import { CustomError, MissingData } from "../../errors/customErrors";
import User from "../../models/user";
import IUserRepository from "../../repositories/userRepository/IuserRepository";
import UserRepository from "../../repositories/userRepository/userRepository";
import IEditUserCase from "./IeditUserCase";

export default class EditUserCase implements IEditUserCase {
    private readonly repository: IUserRepository;
    constructor() {
        this.repository = new UserRepository();
    }
    async execute(user: User, isValid: boolean) {
        try {
            const isEmpty = Object.values(user).every((value) => !value);
           
            if (!isValid || isEmpty) {
                throw new MissingData(400, "", "Preencha algum dos campos");
            }
            await this.repository.updateUser(user);
        } catch (error) {
            if (error instanceof CustomError) {
                throw new Error(error.screenMessage);
            }
        }
    }
}
