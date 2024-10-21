import IPostRepository from "../../../repositories/postRepository/IpostRepository";
import { PostRepository } from "../../../repositories/postRepository/postRepository";
import { UnableGetPostError } from "../errors/postErrors";

export default class getPostByIdCase {
    postRepository: IPostRepository;

    constructor() {
        this.postRepository = new PostRepository();
    }

    async execute(postId: string) {
        try {
            const response = await this.postRepository.getPostById(postId);
            return response;
        } catch (error) {
            throw new UnableGetPostError();
        }
    }
}
