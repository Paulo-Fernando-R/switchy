import StorageTypeEnum from "../../enums/storageTypeEnum";
import Auth from "../../models/auth";
import User from "../../models/user";
import IUserRepository from "../../repositories/userRepository/IuserRepository";
import UserRepository from "../../repositories/userRepository/userRepository";
import IStorageService from "../../services/storageService/IstorageService";
import StorageService from "../../services/storageService/storageService";
import IgetUserDataCase from "./IgetUserDataCase";

export default class GetUserDataCase implements IgetUserDataCase {
    private readonly repository: IUserRepository;
    private readonly storage: IStorageService<User>;

    constructor() {
        this.repository = new UserRepository();
        
        this.storage = new StorageService<User>(StorageTypeEnum.user);
    }

    async execute() {
        const res = await this.repository.getUserInfo();
        this.storage.setItem(res);
        return res;
    }
}
