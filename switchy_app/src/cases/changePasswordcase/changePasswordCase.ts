import { CustomError, MissingData } from "../../errors/customErrors";
import User from "../../models/user";
import IUserRepository from "../../repositories/userRepository/IuserRepository";
import UserRepository from "../../repositories/userRepository/userRepository";
import IChangePasswordCase from "./IchangePasswordCase";

export default class ChangePasswordCase implements IChangePasswordCase {
    private readonly repository: IUserRepository;
    constructor() {
        this.repository = new UserRepository();
    }
    async execute(oldPassword: string, newPassword: string, isValid: boolean) {
        try {
            
            if (oldPassword === newPassword) {
                throw new MissingData(400, "", "Senhas iguais");
            }

            await this.repository.changePassword(oldPassword, newPassword);
        } catch (error) {
            console.error(error);
            if (error instanceof CustomError) {
                throw new Error(error.screenMessage);
            }
        }
    }
}
