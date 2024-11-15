import StorageTypeEnum from "../../enums/storageTypeEnum";
import { CustomError } from "../../errors/customErrors";
import Auth from "../../models/auth";
import AuthRepository from "../../repositories/authRepository/authRepository";
import IAuthRepository from "../../repositories/authRepository/IauthRepository";
import IStorageService from "../../services/storageService/IstorageService";
import StorageService from "../../services/storageService/storageService";
import ISignInCase from "./IsignInCase";
export default class SignInCase implements ISignInCase {
    private readonly repository: IAuthRepository;
    private readonly storage: IStorageService<Auth>;

    constructor() {
        this.repository = new AuthRepository();
        this.storage = new StorageService<Auth>(StorageTypeEnum.auth);
    }
    async execute(email: string, password: string) {
        try {
            const res = await this.repository.login(email, password);
            this.storage.setItem(res);
            return res;
        } catch (error) {
            if (error instanceof CustomError) {
                throw new Error(error.screenMessage);
            }
            throw new Error("Erro ao realizar login");
        }
    }
}
