import { IUser } from "../../models/user";

export default interface IUserRepository {
    createUser(user: IUser): Promise<IUser>;
    getById(id: string): Promise<IUser | null>
    getByEmailAndPassword(email: string, password: string): Promise<IUser | null>;
    getByEmail(email: string): Promise<IUser | null>
    searchUser(query: string): Promise<IUser[]>
    update(userId: string, name: string, email: string, password: string, userName: string): Promise<void>
}
