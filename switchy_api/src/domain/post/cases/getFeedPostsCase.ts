import IPostRepository from "../../../repositories/postRepository/IpostRepository";
import { UnableGetPostError } from "../errors/postErrors";

export default class GetFeedPostsCase {
    private readonly postRepository: IPostRepository;

    constructor(_postRepository: IPostRepository) {
        this.postRepository = _postRepository;
    }

    async execute(userId: string, page: number) {
        try {
            const response = await this.postRepository.getFeedPosts(userId, page);

            return response;
        } catch (error) {
            console.error(error);
            throw new UnableGetPostError();
        }
    }
}
