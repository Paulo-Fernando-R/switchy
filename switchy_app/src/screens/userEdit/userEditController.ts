import { UseFormReset } from "react-hook-form";
import User from "../../models/user";
import type { UserInfoFormData } from "./privateComponents/PersonalInfo";
import EditUserCase from "../../cases/editUserCase/editUserCase";
import StorageService from "../../services/storageService/storageService";
import IStorageService from "../../services/storageService/IstorageService";
import StorageTypeEnum from "../../enums/storageTypeEnum";
export default class UserEditController {
    private readonly editUserCase: EditUserCase;
    private readonly storageService: IStorageService<User>;
    constructor() {
        this.editUserCase = new EditUserCase();
        this.storageService = new StorageService(StorageTypeEnum.user);
    }

    async updateUserInfo(user: User, reset: UseFormReset<UserInfoFormData>, isValid: boolean) {
        await this.editUserCase.execute(user, isValid);
        reset();

        const current = this.storageService.getItem();
        this.setNewStoredUser(current, user);

        return user;
    }

    setNewStoredUser(current: User | null, update: User) {
        if (!current) {
            return;
        }

        if (update.email) {
            current.email = update.email;
        }

        if (update.userName) {
            current.userName = update.userName;
        }

        if (update.name) {
            current.name = update.name;
        }

        if (update.description) {
            current.description = update.description;
        }

        this.storageService.setItem(current);
    }
}
