import IUserRepository from "../../../repositories/userRepository/IuserRepository";

export default class UnfollowUserCase {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(loggedUser: string, userToUnfollow: string): Promise<void> {
        this.userRepository.removeFollow(loggedUser, userToUnfollow);
        this.userRepository.removeFollowing(loggedUser, userToUnfollow);
    }
}