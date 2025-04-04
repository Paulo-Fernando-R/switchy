import emailValidator from 'email-validator';
import IUserRepository from '../../../repositories/userRepository/IuserRepository';
import { IUser } from '../../../models/user';
import { UserEmptyFieldsError, UserInvalidEmailError, UserInvalidPasswordError, UserNotFoundError } from '../errors/userErrors';
import IEncryptService from '../../../services/encrypt/iencryptService';
import { inject, injectable } from 'inversify';
import "reflect-metadata";

@injectable()
export default class GetUserByEmailPasswordCase {
    
    private userRepository: IUserRepository;
    private encryptService: IEncryptService;

    constructor(
        @inject('UserRepository') userRepository: IUserRepository, 
        @inject('EncryptService') encryptService: IEncryptService) {
        this.userRepository = userRepository;
        this.encryptService = encryptService;
    }

    async execute(email: string, password: string) : Promise<IUser> {
        if (!email || !password) {
            throw new UserEmptyFieldsError();
        }

        // const isValidEmail = emailValidator.validate(email);
        // if (!isValidEmail) {
        //     throw new UserInvalidEmailError();
        // }

        // if (password.length < 8 || password.length > 16) {
        //     throw new UserInvalidPasswordError();
        // }

        const user: any = await this.userRepository.getByEmail(email);
        if (user == null) {
            throw new UserNotFoundError();
        }
        
        const isValidPassword = await this.encryptService.comparePassword(password, user.password);
        if(!isValidPassword){
            throw new UserInvalidPasswordError();
        }

        return user;
    }
}