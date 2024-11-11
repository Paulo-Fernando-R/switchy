import { IUser } from "../../models/user";

export default interface IUserRepository {
    createUser(user: IUser): Promise<IUser>;
    getById(id: string): Promise<IUser | null>
    getByEmailAndPassword(email: string, password: string): Promise<IUser | null>;
    getByEmail(email: string): Promise<IUser | null>
    searchUser(query: string): Promise<IUser[]>
    update(userId: string, name: string, email: string): Promise<IUser | null>
    getByIdWithPassword(id: string): Promise<IUser | null>
    changePasswordById(userId: string, newPassword: string): Promise<void>;
    addFollow(userId: string, userToFollow: string): Promise<void>;
    addFollowing(userId: string, userToFollow: string): Promise<void>;
    removeFollow(userId: string, userToUnfollow: string): Promise<void>;
    removeFollowing(userId: string, userToUnfollow: string): Promise<void>;
    getByUsername(username: string): Promise<IUser | null>;
    updateUsername(userId: string, username: string): Promise<void>;
}
