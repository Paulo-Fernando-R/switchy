import "reflect-metadata";
import { inject, injectable } from "inversify";
import IPostRepository from "../../../repositories/postRepository/IpostRepository";
import IUserRepository from "../../../repositories/userRepository/IuserRepository";

@injectable()
export default class DeleteUserAccountCase {
    private readonly postRepository: IPostRepository;
    private readonly userRepository: IUserRepository;
    
    constructor(
        @inject('PostRepository') postRepository: IPostRepository,
        @inject('UserRepository') userRepository: IUserRepository
    ) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    async execute(userId: string) {
        await this.postRepository.deleteAllByUser(userId);
        await this.userRepository.delete(userId);
    }
}