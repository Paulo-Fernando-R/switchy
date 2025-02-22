import { inject, injectable } from "inversify";
import { getTotalComments, getTotalLikes, isLikedByUser } from "../../../helpers/post/posthelpers";
import IPostRepository from "../../../repositories/postRepository/IpostRepository";
import IGetPostByIdResponse from "../response/getPostByIdResponse";
import "reflect-metadata";

@injectable()
export default class GetPostByIdCase {
    private readonly postRepository: IPostRepository;

    constructor(@inject('PostRepository') _postRepository: IPostRepository) {
        this.postRepository = _postRepository;
    }

    async execute(postId: string, loggedUserId: any) {
        const post = await this.postRepository.getPostById(postId);

        var comments = getTotalComments(post);
        var likes = getTotalLikes(post);
        var likedByUser = isLikedByUser(post, loggedUserId);

        var obj: IGetPostByIdResponse = {
            content: post.content,
            publishDate: post.publishDate,
            user: {
                id: post.user.get('id'),
                name: post.user.get('name'),
                userName: post.user.get('userName'),
            },
            id: post.id!.toString(),
            parentId: post.parentId,
            comments: comments,
            likes: likes,
            likedByUser: likedByUser,
        };

        return obj;
    }
}
