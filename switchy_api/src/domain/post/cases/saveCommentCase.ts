import { IUser } from "../../../models/user";
import IPostRepository from "../../../repositories/postRepository/IpostRepository";
import { PostEmptyValueError } from "../errors/postErrors";

export default class SaveCommentCase {
    private readonly postRepository: IPostRepository;

    constructor(postRepository: IPostRepository) {
        this.postRepository = postRepository;
    }

    async execute(content: string, parentId: string, user: IUser) {
        if (!content) {
            throw new PostEmptyValueError();
        }

        if (!parentId) {
            throw new PostEmptyValueError();
        }

        const post = await this.postRepository.addComment(parentId, content, user);
        await this.postRepository.addCommentsToPost(parentId, post.id!.toString());
    }
}