import IPostRepository from "../../../repositories/postRepository/IpostRepository";
import { UnableGetPostError } from "../errors/postErrors";

export default class getPostByIdCase {
    private readonly postRepository: IPostRepository;

    constructor(_postRepository: IPostRepository) {
        this.postRepository = _postRepository;
    }

    async execute(postId: string) {
        try {
            const response = await this.postRepository.getPostById(postId);
            return response;
        } catch (error) {
            console.error(error);
            throw new UnableGetPostError();
        }
    }
}
