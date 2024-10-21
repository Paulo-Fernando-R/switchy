import IPostRepository from "../../../repositories/postRepository/IpostRepository";
import { AddLikeToPostError, PostEmptyValueError } from "../errors/postErrors";

export default class AddLikeToPostCase {
    private readonly postRepository: IPostRepository;

    constructor(_postRepository: IPostRepository) {
        this.postRepository = _postRepository;
    }

    async execute(postId: string, userId: string) {
        if (!postId) {
            throw new PostEmptyValueError();
        }

        try {
            await this.postRepository.addLikeToPost(postId, userId);
        } catch (error) {
            console.error(error);
            throw new AddLikeToPostError();
        }
    }
}
