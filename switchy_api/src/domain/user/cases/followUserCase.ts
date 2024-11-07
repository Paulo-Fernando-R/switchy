import IUserRepository from "../../../repositories/userRepository/IuserRepository";

export default class FollowUserCase {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(loggedUser: string, userToFollow: string) {
        this.userRepository.addFollow(loggedUser, userToFollow);
        this.userRepository.addFollowing(loggedUser, userToFollow);
    }
}