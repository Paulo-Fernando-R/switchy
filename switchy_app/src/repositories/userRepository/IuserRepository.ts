import User from "../../models/user";

export default interface IUserRepository {
    getUserInfo(): Promise<User>;
    searchUser(query: string): Promise<User[]>;
    getUserById(userId: string): Promise<User>;
    updateUser(user: User): Promise<void>;
    changePassword(oldPassword: string, newPassword: string): Promise<void>;
    followUser(userId: string): Promise<void>;
    unFollowUser(userId: string): Promise<void>;
    chnageUsername(username: string): Promise<void>
}
