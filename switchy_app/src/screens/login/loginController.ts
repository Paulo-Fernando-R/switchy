import StorageTypeEnum from "../../enums/storageTypeEnum";
import Auth from "../../models/auth";
import AuthRepository from "../../repositories/authRepository/authRepository";
import IAuthRepository from "../../repositories/authRepository/IauthRepository";
import IStorageService from "../../services/storageService/IstorageService";
import StorageService from "../../services/storageService/storageService";

export default class LoginController {
    private readonly repository: IAuthRepository;
    private readonly storage: IStorageService<Auth>;

    constructor() {
        this.repository = new AuthRepository();
        this.storage = new StorageService<Auth>(StorageTypeEnum.auth);
    }

    async signIn(email: string, password: string, setAuth: (value: Auth) => void) {
        const reg = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$");

        // if (!reg.test(email)) {
        //     return;
        // }

        const res = await this.repository.login(email, password);

        if (!res) {
            return;
        }

        this.storage.setItem(res);

        setAuth(res);

        return res;
    }
}
