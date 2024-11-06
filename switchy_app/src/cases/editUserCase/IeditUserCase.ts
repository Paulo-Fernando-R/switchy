import User from "../../models/user";

export default interface IEditUserCase {
    execute(user: User, isValid: boolean): Promise<void>
}
