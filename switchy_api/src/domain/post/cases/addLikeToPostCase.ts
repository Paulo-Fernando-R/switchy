import IPostRepository from "../../../repositories/postRepository/IpostRepository";
import { PostRepository } from "../../../repositories/postRepository/postRepository";
import { AddLikeToPostError, PostEmptyValueError } from "../errors/postErrors";

export default class AddLikeToPostCase {
    private readonly postRepository: IPostRepository;

    constructor() {
        this.postRepository = new PostRepository();
    }

    async execute(postId: string, userId: string) {
        if (!postId) {
            throw new PostEmptyValueError();
        }

        try {
            await this.postRepository.addLikeToPost(postId, userId);
        } catch (error) {
            throw new AddLikeToPostError();
        }
    }
}
