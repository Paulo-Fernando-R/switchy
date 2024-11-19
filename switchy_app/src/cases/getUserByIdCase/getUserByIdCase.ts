import StorageTypeEnum from "../../enums/storageTypeEnum";
import { CustomError } from "../../errors/customErrors";
import Auth from "../../models/auth";
import User from "../../models/user";
import IUserRepository from "../../repositories/userRepository/IuserRepository";
import UserRepository from "../../repositories/userRepository/userRepository";
import IStorageService from "../../services/storageService/IstorageService";
import StorageService from "../../services/storageService/storageService";
import IgetUserByIdCase from "./IgetUserByIdCase";

export default class GetUserByIdCase implements IgetUserByIdCase {
    private readonly repository: IUserRepository;
    private readonly storage: IStorageService<User>;

    constructor() {
        this.repository = new UserRepository();

        this.storage = new StorageService<User>(StorageTypeEnum.user);
    }

    async execute(id: string) {
        try {
            const res = await this.repository.getUserById(id);
            return res;
        } catch (error) {
            if (error instanceof CustomError) {
                throw new Error(error.screenMessage);
            }
            throw new Error("Erro ao realizar login");
        }
    }
}
