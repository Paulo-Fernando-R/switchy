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
                userName: user.userName,
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
            followers: user?.followers,
            following: user?.following,
            
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
            password: userFromDataBase.password
        };
        
        return user;
    }
    
    async searchUser(query: string) {
        await this.connect();
        
        const res = await User.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { userName: { $regex: query, $options: "i" } },
                { email: { $regex: query, $options: "i" } },
            ],
        });
        
        const userList: IUser[] = res.map((e) => {
            return {
                email: e.email,
                name: e.name,
                id: e._id,
                userName: e.userName,
            };
        });
        
        return userList;
    }
    
    async update(userId: string, name: string, email: string, password: string, userName: string): Promise<void> {
        await User.findByIdAndUpdate(userId, {
            // TODO:
        });
    }
    
    async getByIdWithPassword(id: string) {
        await this.connect();
    
        const user = await User.findById(id);
        if (user == null) return null;
    
        const res: IUser = {
            id: user?._id,
            email: user?.email,
            password: user?.password,
            userName: user.userName,
            name: user?.name!,
        };
    
        return res;
    }
    async changePasswordById(userId: string, newPassword: string): Promise<void>{
        await this.connect();
        
        await User.findByIdAndUpdate(userId, {password: newPassword});
    }
}
