import IUserRepository from "../../../repositories/userRepository/IuserRepository";
import { inject, injectable } from "inversify";
import "reflect-metadata";

@injectable()
export default class FollowUserCase {
    private userRepository: IUserRepository;

    constructor(@inject('UserRepository') userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(loggedUser: string, userToFollow: string) {
        this.userRepository.addFollow(loggedUser, userToFollow);
        this.userRepository.addFollowing(loggedUser, userToFollow);
    }
}