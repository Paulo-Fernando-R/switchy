import { IUser } from "../../../models/user";
import IUserRepository from "../../../repositories/userRepository/IuserRepository";
import { UserEmptyFieldsError, UserInvalidEmailError } from "../errors/userErrors";
import fieldsExists from "../../../helpers/objects/fieldsExists";
import fieldsNotEmpty from "../../../helpers/objects/fieldsNotEmpty";
import signUpRequiredFieldsRule from "../rules/signUpRequiredFields";
import { StatusCodes } from "../../../utils/status_codes";
import IEncryptService from "../../../services/encrypt/iencryptService";
import SignUpRequest from "../requests/signUpRequest";
import ServerError from "../../../errors/serverError";

export default class SearchUserCase {
    private readonly userRepository: IUserRepository;

    constructor(userRepository: IUserRepository, encryptService: IEncryptService) {
        this.userRepository = userRepository;
    }

    async execute(query: string): Promise<IUser[]> {
        if (!query) {
            throw new UserEmptyFieldsError("Missing required fields", StatusCodes.BadRequest);
        }

        try {
            const response = await this.userRepository.searchUser(query);
            return response;
        } catch (error) {
            console.error(error);
            throw new ServerError();
        }
    }
}
