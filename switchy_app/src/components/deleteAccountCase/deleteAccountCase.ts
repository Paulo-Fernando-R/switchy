import { CustomError } from "../../errors/customErrors";
import IAuthRepository from "../../repositories/authRepository/IauthRepository";
import AuthRepository from "../../repositories/authRepository/authRepository";

export default class DeleteAccountCase {
    private authRepository: IAuthRepository;
    constructor() {
        this.authRepository = new AuthRepository();
    }
    async execute() {
        try {
            await this.authRepository.deleteAccount();
        } catch (error) {
            console.error(error);
            if (error instanceof CustomError) {
                throw new Error(error.screenMessage);
            }
            throw new Error("Erro ao deletar conta");
        }
    }
}
