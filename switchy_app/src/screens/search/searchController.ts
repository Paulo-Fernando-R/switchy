import IUserRepository from "../../repositories/userRepository/IuserRepository";
import UserRepository from "../../repositories/userRepository/userRepository";

export default class SearchController {
    private repository: IUserRepository;

    constructor() {
        this.repository = new UserRepository();
    }

    async searchUser(query: string) {
        if (query.length < 3) return;

        const response = await this.repository.searchUser(query);
        return response;
    }
}
