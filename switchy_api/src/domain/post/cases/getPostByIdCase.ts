import { IPost } from "../../../models/post";
import IPostRepository from "../../../repositories/postRepository/IpostRepository";
import IGetPostByIdResponse from "../response/getPostByIdResponse";

export default class getPostByIdCase {
    private readonly postRepository: IPostRepository;

    constructor(_postRepository: IPostRepository) {
        this.postRepository = _postRepository;
    }

    async execute(postId: string, loggedUserId: any) {
        const post = await this.postRepository.getPostById(postId);

        var comments = this.getTotalComments(post);
        var likes = this.getTotalLikes(post);
        var likedByUser = this.isLikedByUser(post, loggedUserId);

        var obj: IGetPostByIdResponse = {
            content: post.content,
            publishDate: post.publishDate,
            user: post.user,
            id: post.id!.toString(),
            parentId: post.parentId,
            comments: comments,
            likes: likes,
            likedByUser: likedByUser,
        };

        return obj;
    }

    private isLikedByUser(post: IPost, userId: string) {
        if (post.likes == null) {
            return false;
        }

        var likedByUser = post.likes.filter((like: any) => like.userId.equals(userId)).length > 0;
        return likedByUser;
    }

    private getTotalComments(post: IPost) {
        var comments = 0;
        if (post.comments != null) {
            comments = post.comments?.length;
        }
        return comments;
    }

    private getTotalLikes(post: IPost) {
        var likes = 0;
        if (post.likes != null) {
            likes = post.likes?.length;
        }
        return likes;
    }
}
