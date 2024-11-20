import User from "../../models/user";

export default interface IgetUserByIdCase {
    execute(id: string): Promise<User>
}