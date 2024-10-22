import User from "../../models/user";

export default interface IUserRepository {
    getUserInfo(): Promise<User>;
}
