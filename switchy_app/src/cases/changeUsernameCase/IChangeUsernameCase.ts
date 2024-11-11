import User from "../../models/user";

export default interface IChangeUsernameCase {
    execute(user: User, isValid: boolean): Promise<void>;
}
