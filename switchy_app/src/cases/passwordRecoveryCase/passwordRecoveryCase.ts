import { BadRequestError, CustomError } from "../../errors/customErrors";
import AuthRepository from "../../repositories/authRepository/authRepository";
import IAuthRepository from "../../repositories/authRepository/IauthRepository";

export default class PasswordRecoveryCase {
    private readonly repository: IAuthRepository;

    constructor() {
        this.repository = new AuthRepository();
    }
    async execute(email: string) {
        const reg = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$");

        try {
            if (!reg.test(email)) {
                throw new BadRequestError(400, "", "Email inválido");
            }
            await this.repository.recovery(email);
        } catch (error) {
            console.error(error);
            if (error instanceof CustomError) {
                throw new Error(error.screenMessage);
            }
            throw new Error("Erro ao enviar email");
        }
    }
}
