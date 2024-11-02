import { IUser } from '../../../models/user';
import IUserRepository from '../../../repositories/userRepository/IuserRepository';
import IEncryptService from '../../../services/encrypt/iencryptService';
import ITokenService from '../../../services/token/itokenService';
import { AuthInvalidTokenError } from '../../auth/errors/authErrors';
import { SamePasswordError, UserEmptyFieldsError, UserInvalidPasswordError } from '../errors/userErrors';

export default class ChangeUserPasswordCase {
    private readonly userRepository: IUserRepository;
    private readonly encryptService: IEncryptService;

    constructor(userRepository: IUserRepository, encryptService: IEncryptService) {
        this.userRepository = userRepository;
        this.encryptService = encryptService;
    }

    async execute(userId: string, oldPassword: string, newPassword: string) : Promise<void> {

        
        if (!userId || !oldPassword || !newPassword) {
            throw new UserEmptyFieldsError();
        }

        if (oldPassword == newPassword) {
            throw new SamePasswordError();
        }

        const user: any = await this.userRepository.getByIdWithPassword(userId);

        const isOldPasswordCorrect = await this.encryptService.comparePassword(oldPassword, user.password);

        if(!isOldPasswordCorrect){
            throw new UserInvalidPasswordError();
        }

        newPassword = await this.encryptService.hashPassword(newPassword);

        await this.userRepository.changePasswordById(userId, newPassword);

    }
}