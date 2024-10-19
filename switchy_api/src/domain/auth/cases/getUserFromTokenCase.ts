import { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import jwtMiddleware from "../../../middleware/jwtMiddleware";
import { IUser } from "../../../models/user";
import IUserRepository from "../../../repositories/userRepository/IuserRepository";
import { UserNotFoundError } from "../../user/errors/userErrors";
import { AuthEmptyFieldsError, AuthInvalidTokenError } from "../errors/authErrors";

export default class GetUserFromTokenCase {
    private readonly userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(token: string): Promise<IUser> {
        if (!token) {
            throw new AuthEmptyFieldsError();
        }

        let result: JwtPayload;
        try {
            result = jwtMiddleware.isValid(token);
        } catch (ex) {
            if (ex instanceof JsonWebTokenError) {
                throw new AuthInvalidTokenError();
            }

            throw ex;
        }

        const id = result.userId;

        const user = await this.userRepository.getUserById(id);
        if (user == null) {
            throw new UserNotFoundError();
        }

        return user;
    }
}