import User from "../../models/user";

export default interface IgetUserDataCase{
    execute(): Promise<User>
}