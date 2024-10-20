import { Types } from "mongoose";
import IPostRepository from "../../../repositories/postRepository/IpostRepository";
import { IPost } from "../../../models/post";

export default class GetCommentsCase {
    private readonly postRepository: IPostRepository;

    constructor(postRepository: IPostRepository) {
        this.postRepository = postRepository;
    }

    async execute(id: string): Promise<IPost[]> {
        const post = await this.postRepository.getPostById(id);
        const comments = post.comments;
        if (!comments || comments.length == 0) {
            return [];
        }

        const ids = comments.map((e) => new Types.ObjectId(e.postId));
        const posts = await this.postRepository.getPostComments(ids);
        return posts;
    }
}