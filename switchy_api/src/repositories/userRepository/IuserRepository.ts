import { IUser } from "../../models/user";

export default interface IUserRepository {
    createUser(user: IUser): Promise<IUser>;
    getUserById(id: string): Promise<IUser | null>
    getByEmailAndPassword(email: string, password: string): Promise<IUser | null>;
}
