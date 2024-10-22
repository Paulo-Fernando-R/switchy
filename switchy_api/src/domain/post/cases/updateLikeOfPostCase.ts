import IPostRepository from "../../../repositories/postRepository/IpostRepository";
import { PostEmptyValueError } from "../errors/postErrors";

export default class UpdateLikeOfPostCase {
    private readonly postRepository: IPostRepository;

    constructor(_postRepository: IPostRepository) {
        this.postRepository = _postRepository;
    }

    async execute(postId: string, userId: string, value: boolean) {
        if (!postId) {
            throw new PostEmptyValueError();
        }

        if (value) {
            await this.postRepository.addLike(postId, userId);
        } else {
            await this.postRepository.removeLike(postId, userId);
        }
    }
}
