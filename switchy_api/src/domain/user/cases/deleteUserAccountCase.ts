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
        let posts = await this.postRepository.getAllByUser(userId);
        for (let i = 0; i < posts.length; i++) {
            let post = posts[i];
            let postId = post.id!.toString();
            await this.postRepository.deletePost(postId);
        }

        await this.userRepository.delete(userId);
        await this.postRepository.deleteLikesByUser(userId);
    }
}