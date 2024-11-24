import IUserRepository from "../../../repositories/userRepository/IuserRepository";
import { inject, injectable } from "inversify";
import "reflect-metadata";

@injectable()
export default class UnfollowUserCase {
    private userRepository: IUserRepository;

    constructor(@inject('UserRepository') userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(loggedUser: string, userToUnfollow: string): Promise<void> {
        this.userRepository.removeFollow(loggedUser, userToUnfollow);
        this.userRepository.removeFollowing(loggedUser, userToUnfollow);
    }
}