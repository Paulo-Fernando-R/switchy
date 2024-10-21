import IPostRepository from "../../../repositories/postRepository/IpostRepository";
import { PostRepository } from "../../../repositories/postRepository/postRepository";
import { UnableGetPostError } from "../errors/postErrors";

export default class GetFeedPostsCase {
    postRepository: IPostRepository;

    constructor() {
        this.postRepository = new PostRepository();
    }

    async execute(userId: string) {
        try {
            const response = await this.postRepository.getFeedPosts(userId);

            return response;
        } catch (error) {
            throw new UnableGetPostError();
        }
    }
}
