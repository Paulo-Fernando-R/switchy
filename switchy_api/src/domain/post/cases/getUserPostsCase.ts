import ServerError from "../../../errors/serverError";
import IPostRepository from "../../../repositories/postRepository/IpostRepository";
import { PostEmptyValueError } from "../errors/postErrors";
import GetPostsResponse from "../response/getFeedPostsResponse";

export default class GetUserPostsCase {
    private readonly postRepository: IPostRepository;

    constructor(_postRepository: IPostRepository) {
        this.postRepository = _postRepository;
    }

    async execute(userId: string, page: number) {
        try {
            const posts = await this.postRepository.getUserPosts(userId, page);
            const response = new GetPostsResponse(posts);
            response.setPostsLikedByUser(userId);
            return response.getResponse();
        } catch (error) {
            console.error(error);
            throw new ServerError();
        }
    }
}
