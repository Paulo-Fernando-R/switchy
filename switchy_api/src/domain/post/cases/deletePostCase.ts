import IPostRepository from "../../../repositories/postRepository/IpostRepository";
import { UnableDeletePostError } from "../errors/postErrors";

export default class DeletePostCase {
    private readonly postRepository: IPostRepository;
    constructor(postRepository: IPostRepository) {
        this.postRepository = postRepository;
    }

    async execute(postId: string) {
        try {
            await this.postRepository.deletePost(postId);
        } catch (error) {
            throw new UnableDeletePostError();
        }
    }
}
