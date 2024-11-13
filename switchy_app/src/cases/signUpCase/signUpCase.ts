import StorageTypeEnum from "../../enums/storageTypeEnum";
import Auth from "../../models/auth";
import AuthRepository from "../../repositories/authRepository/authRepository";
import IAuthRepository from "../../repositories/authRepository/IauthRepository";
import IStorageService from "../../services/storageService/IstorageService";
import StorageService from "../../services/storageService/storageService";
import ISignUpCase from "./IsignUpCase";

export default class SignUpCase implements ISignUpCase {
    private readonly repository: IAuthRepository;
    private readonly storage: IStorageService<Auth>;

    constructor() {
        this.repository = new AuthRepository();
        this.storage = new StorageService<Auth>(StorageTypeEnum.auth);
    }

    async execute(name: string, username: string, email: string, password: string) {
        //const reg = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$");
        // if (!reg.test(email)) {
        //     return;
        // }
        //!adicionar validações

        const res = await this.repository.signUp(name, username, email, password);
        console.log(res);
        this.storage.setItem(res);
        return res;
    }
}
