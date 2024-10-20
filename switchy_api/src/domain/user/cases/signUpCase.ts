import { IUser } from "../../../models/user";
import IUserRepository from "../../../repositories/userRepository/IuserRepository";
import { UserEmptyFieldsError, UserInvalidEmailError } from "../errors/userErrors";
import fieldsExists from "../../../helpers/objects/fieldsExists";
import fieldsNotEmpty from "../../../helpers/objects/fieldsNotEmpty";
import signUpRequiredFieldsRule from "../rules/signUpRequiredFields";
import { StatusCodes } from "../../../utils/status_codes";
import IEncryptService from "../../../services/encrypt/iencryptService";
import SignUpRequest from "../requests/signUpRequest";

export default class SignUpCase {
    
    private readonly userRepository: IUserRepository;
    private readonly encryptService: IEncryptService;

    constructor(
        userRepository: IUserRepository,
        encryptService: IEncryptService
    ){
        this.userRepository = userRepository;
        this.encryptService = encryptService
    }

    async execute(newUserData: SignUpRequest): Promise<IUser>{


        if (!newUserData.name || !newUserData.email || !newUserData.password) {
            throw new UserEmptyFieldsError("Missing required fields", StatusCodes.BadRequest);
        }

        const emailAlreadyTaken = await this.userRepository.getByEmail(newUserData.email);
        
        if (emailAlreadyTaken != null) {
            throw new UserInvalidEmailError("Email already taken.", StatusCodes.BadRequest);
        }
        
        newUserData.password = await this.encryptService.hashPassword(newUserData.password);
            
        const user: IUser = {
            email: newUserData.email,
            name: newUserData.name,
            password: newUserData.password,
        };
        
        return await this.userRepository.createUser(user);

    }
}