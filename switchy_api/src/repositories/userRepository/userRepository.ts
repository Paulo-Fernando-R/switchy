import { IUser, User } from "../../models/user";
import DatabaseConnection from "../../database/databaseConnection";
import IUserRepository from "./IuserRepository";
import ITokenService from "../../services/token/itokenService";
import JwtTokenService from "../../services/token/jwtTokenService";
import { injectable } from "inversify";
import "reflect-metadata";
import { Types } from "mongoose";

@injectable()
export class UserRepository extends DatabaseConnection implements IUserRepository {
    private readonly jwt: ITokenService;

    constructor() {
        super();
        this.jwt = new JwtTokenService();
    }

    async create(user: IUser) {
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
            id: newUser._id,
            email: newUser.email,
            name: newUser.name,
            token: token,
        };

        return res;
    }

    async getById(id: string) {
        await this.connect();

        const user = await User.findById(id);
        if (user == null) return null;

        const res: IUser = {
            id: user?._id,
            email: user?.email,
            userName: user.userName,
            description: user?.description,
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
            password: userFromDataBase.password,
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

        const userList: IUser[] = res.map((e: any) => {
            return {
                email: e.email,
                name: e.name,
                id: e._id,
                userName: e.userName,
            };
        });

        return userList;
    }

    async update(userId: string, name: string, email: string, description: string): Promise<IUser | null> {
        const updateObj = {};
        if (name) {
            Object.defineProperty(updateObj, "name", {
                value: name,
                enumerable: true,
                configurable: true,
                writable: true,
            });
        }

        if (email){
            Object.defineProperty(updateObj, "email", {
                value: email,
                enumerable: true,
                configurable: true,
                writable: true,
            });
        }

        if (description){
            Object.defineProperty(updateObj, "description", {
                value: description,
                enumerable: true,
                configurable: true,
                writable: true,
            });
        }

        const res = await User.findByIdAndUpdate(userId, updateObj, { returnDocument: "after" });
        if (res == null) return null;

        const user: IUser = {
            id: res?._id,
            email: res?.email,
            userName: res.userName,
            description: res.description,
            name: res?.name!,
            followers: res?.followers,
            following: res?.following,
        };

        return user;
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

    async changePasswordById(userId: string, newPassword: string): Promise<void> {
        await this.connect();

        await User.findByIdAndUpdate(userId, { password: newPassword });
    }

    async addFollow(userId: string, userToFollow: string): Promise<void> {
        await this.connect();

        await User.findByIdAndUpdate(userToFollow, {
            $push: { followers: { userId: userId } },
        });
    }

    async addFollowing(userId: string, userToFollow: string): Promise<void> {
        await this.connect();

        await User.findByIdAndUpdate(userId, {
            $push: { following: { userId: userToFollow } },
        });
    }

    async removeFollow(userId: string, userToUnfollow: string): Promise<void> {
        await this.connect();

        await User.findByIdAndUpdate(userToUnfollow, {
            $pull: { followers: { userId: userId } },
        });
    }

    async removeFollowing(userId: string, userToUnfollow: string): Promise<void> {
        await this.connect();

        await User.findByIdAndUpdate(userId, {
            $pull: { following: { userId: userToUnfollow } },
        });
    }

    async getByUsername(username: string): Promise<IUser | null> {
        await this.connect();

        const userFromDataBase = await User.findOne({
            username: username,
        });

        if (!userFromDataBase) {
            return null;
        }

        const user: IUser = {
            id: userFromDataBase._id,
            name: userFromDataBase.name,
            email: userFromDataBase.email,
            password: userFromDataBase.password,
        };

        return user;
    }

    async updateUsername(userId: string, username: string): Promise<IUser | null> {
        await this.connect();

        var res = await User.findByIdAndUpdate(userId, { userName: username }, { returnDocument: 'after' });
        if (res == null) return null;

        const user: IUser = {
            id: res?._id,
            email: res?.email,
            userName: res.userName,
            description: res.description,
            name: res?.name!,
            followers: res?.followers,
            following: res?.following,
        };

        return user;
    }

    async delete(userId: string): Promise<void> {
        await User.findByIdAndUpdate({ _id: new Types.ObjectId(userId) }, { deleted: true });
    }
}
