import { IUser, User } from "../../models/user";
import DatabaseConnection from "../../database/databaseConnection";
import jwtMiddleware from "../../middleware/jwtMiddleware";
import ServerError from "../../errors/serverError";
import IUserRepository from "./IuserRepository";

export default class UserRepository extends DatabaseConnection implements IUserRepository {
    async createUser(user: IUser) {
        try {
            await this.connect();
            const aux = new User({
                email: user.email,
                name: user.name,
                password: user.password,
            });

            const newUser = await aux.save();
          
            const token = jwtMiddleware.createJWT(newUser._id.toString(), '1d');

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

    async getUserById(id: string) {
        await this.connect();

        const user = await User.findById(id);
        if (user == null) return null;

        const res: IUser = {
            id: user?._id,
            email: user?.email!,
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
            email: email
        });

        if(!userFromDataBase){
            return null;
        }
        
        const user: IUser = {
            id: userFromDataBase._id,
            name: userFromDataBase.name,
            email: email,
        }

        return user;
    }
}