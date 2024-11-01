import IUserRepository from "../../../repositories/userRepository/IuserRepository";

export default class UpdateUserCase {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    execute(userId: string, name: string, email: string, password: string, userName: string) {
        this.userRepository.update(userId, name, email, password, userName);
    }
}