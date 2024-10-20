import { IUser, User } from "../../models/user";
import DatabaseConnection from "../../database/databaseConnection";
import ServerError from "../../errors/serverError";
import IUserRepository from "./IuserRepository";
import ITokenService from "../../services/token/itokenService";
import JwtTokenService from "../../services/token/jwtTokenService";

export class UserRepository extends DatabaseConnection implements IUserRepository {
    private readonly jwt: ITokenService;

    constructor() {
        super();
        this.jwt = new JwtTokenService();
    }
    async createUser(user: IUser) {
        try {
            await this.connect();
            const aux = new User({
                email: user.email,
                name: user.name,
                password: user.password,
            });

            const newUser = await aux.save();

            const token = this.jwt.create(newUser._id.toString(), "1d");

            const res: IUser = {
                email: newUser.email,
                name: newUser.name,
                token: token,
            };

            return res;
        } catch (error) {
            console.error(error);
            throw new ServerError();
        }
    }

    async getById(id: string) {
        await this.connect();

        const user = await User.findById(id);
        if (user == null) return null;

        const res: IUser = {
            id: user?._id,
            email: user?.email,
            userName: user.userName,
            name: user?.name!,
        };

        return res;
    }

    async getByEmailAndPassword(email: string, password: string) {
        await this.connect();

        const user = await User.findOne({
            email: email,
            password: password,
        });

        if (!user) return null;

        const res: IUser = {
            id: user._id,
            name: user.name,
            email: email,
        };

        return res;
    }

    async getByEmail(email: string) {
        await this.connect();

        const userFromDataBase = await User.findOne({
            email: email,
        });

        if (!userFromDataBase) {
            return null;
        }

        const user: IUser = {
            id: userFromDataBase._id,
            name: userFromDataBase.name,
            email: email,
        };

        return user;
    }
}
