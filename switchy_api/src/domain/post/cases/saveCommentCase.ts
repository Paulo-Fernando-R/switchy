import { IPost } from "../../../models/post";
import { IUser } from "../../../models/user";
import IPostRepository from "../../../repositories/postRepository/IpostRepository";
import { PostEmptyValueError } from "../errors/postErrors";
import IPostUser from "../../../models/postUser";

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

        var postUser: IPostUser = {
            id: user.id!,
            name: user.name,
            userName: user.userName!,
        };

        const post: IPost = {
            user: postUser,
            comments: [],
            likes: [],
            content: content,
            publishDate: new Date(Date.now()),
            parentId: parentId,
        };

        const postId = await this.postRepository.createPost(post);
        await this.postRepository.addCommentsToPost(parentId, postId.toString());
    }
}