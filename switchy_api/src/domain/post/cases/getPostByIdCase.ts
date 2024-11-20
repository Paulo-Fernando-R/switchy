import IPostRepository from "../../../repositories/postRepository/IpostRepository";
import { UnableGetPostError } from "../errors/postErrors";
import GetPostByIdResponse from "../response/getPostByIdResponse";

export default class getPostByIdCase {
    private readonly postRepository: IPostRepository;

    constructor(_postRepository: IPostRepository) {
        this.postRepository = _postRepository;
    }

    async execute(postId: string, userId: any) {
        try {
            const post = await this.postRepository.getPostById(postId);
            const response = new GetPostByIdResponse(post);
            response.setPostsLikedByUser(userId)
            return response.getResponse();
        } catch (error) {
            console.error(error);
            throw new UnableGetPostError();
        }
    }
}
