import { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import { IUser } from "../../../models/user";
import IUserRepository from "../../../repositories/userRepository/IuserRepository";
import { UserNotFoundError } from "../../user/errors/userErrors";
import { AuthEmptyFieldsError, AuthInvalidTokenError } from "../errors/authErrors";
import ITokenService from "../../../services/token/itokenService";

export default class GetUserFromTokenCase {
    private readonly userRepository: IUserRepository;
    private readonly tokenService: ITokenService;

    constructor(userRepository: IUserRepository, tokenService: ITokenService) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
    }

    async execute(token: string): Promise<IUser> {
        if (!token) {
            throw new AuthEmptyFieldsError();
        }

        let result: JwtPayload;
        try {
            result = this.tokenService.isValid(token);
        } catch (ex) {
            if (ex instanceof JsonWebTokenError) {
                throw new AuthInvalidTokenError();
            }

            throw ex;
        }

        const id = result.userId;

        const user = await this.userRepository.getById(id);
        if (user == null) {
            throw new UserNotFoundError();
        }

        return user;
    }
}