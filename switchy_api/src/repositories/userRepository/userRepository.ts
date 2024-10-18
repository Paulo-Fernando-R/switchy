import { IUser, User } from "../../models/user";
import DatabaseConnection from "../../database/databaseConnection";
import jwtMiddleware from "../../middleware/jwtMiddleware";
import ServerError from "../../errors/serverError";
import IUserRepository from "./IuserRepository";

class UserRepository extends DatabaseConnection implements IUserRepository {
    async createUser(user: IUser) {
        try {
            await this.connect();
            const aux = new User({
                email: user.email,
                name: user.name,
                password: user.password,
            });

            const newUser = await aux.save();
          
            const token = jwtMiddleware.createJWT(newUser._id.toString(), '1h');

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
        try {
            await this.connect();

            const user = await User.findById(id);

            const res: IUser = {
                email: user?.email!,
                name: user?.name!,
            };

            return res;
        } catch (error) {
            console.error(error);
            throw new ServerError();
        }
    }
}

export default new UserRepository();