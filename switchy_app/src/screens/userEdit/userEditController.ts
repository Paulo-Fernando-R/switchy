import { UseFormReset } from "react-hook-form";
import User from "../../models/user";
import type { UserInfoFormData } from "./privateComponents/PersonalInfo";
import EditUserCase from "../../cases/editUserCase/editUserCase";
import StorageService from "../../services/storageService/storageService";
import IStorageService from "../../services/storageService/IstorageService";
import StorageTypeEnum from "../../enums/storageTypeEnum";
import { PasswordFormData } from "./privateComponents/Password";
import ChangePasswordCase from "../../cases/changePasswordcase/changePasswordCase";
import IChangePasswordCase from "../../cases/changePasswordcase/IchangePasswordCase";
import { UsernameFormData } from "./privateComponents/Username";
import IChangeUsernameCase from "../../cases/changeUsernameCase/IChangeUsernameCase";
import ChangeUsernameCase from "../../cases/changeUsernameCase/changeUsernameCase";
import IEditUserCase from "../../cases/editUserCase/IeditUserCase";

export default class UserEditController {
    private readonly editUserCase: IEditUserCase;
    private readonly changePasswordCase: IChangePasswordCase;
    private readonly changeUsernameCase: IChangeUsernameCase;
    private readonly storageService: IStorageService<User>;
    constructor() {
        this.editUserCase = new EditUserCase();
        this.changePasswordCase = new ChangePasswordCase();
        this.changeUsernameCase = new ChangeUsernameCase();
        this.storageService = new StorageService(StorageTypeEnum.user);
    }

    async updateUserInfo(
        user: User,
        reset: UseFormReset<UserInfoFormData>,
        isValid: boolean,
        setUser: (user: User) => void
    ) {
        await this.editUserCase.execute(user, isValid);
        reset(
            { description: user.description, name: user.name, email: user.email },
            { keepDefaultValues: false, keepValues: false }
        );

        const current = this.storageService.getItem();
        this.setNewStoredUser(current, user, setUser);

        return user;
    }

    async changePassword(
        oldPassword: string,
        newPassword: string,
        reset: UseFormReset<PasswordFormData>,
        isValid: boolean
    ) {
        return await this.changePasswordCase.execute(oldPassword, newPassword, isValid);
    }

    async changeUsername(
        user: User,
        reset: UseFormReset<UsernameFormData>,
        isValid: boolean,
        setUser: (user: User) => void
    ) {
        await this.changeUsernameCase.execute(user, isValid);
        reset({ userName: user.userName }, { keepDefaultValues: false, keepValues: false });
        const current = this.storageService.getItem();
        this.setNewStoredUser(current, user, setUser);
    }

    setNewStoredUser(current: User | null, update: User, setUser: (user: User) => void) {
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

        setUser(current);
    }
}
