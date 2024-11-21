import { IPost } from "../../../models/post";
import IPostRepository from "../../../repositories/postRepository/IpostRepository";
import IUserPost from "../entities/userPost";
import IGetFeedPostsResponse from "../response/getFeedPostsResponse";

export default class GetUserPostsCase {
    private readonly postRepository: IPostRepository;

    constructor(_postRepository: IPostRepository) {
        this.postRepository = _postRepository;
    }

    async execute(userId: string, page: number) {
        const posts = await this.postRepository.getUserPosts(userId, page);
        const response = this.parsePostsToResponse(posts, userId);
        return response;
    }

    private parsePostsToResponse(posts: IPost[], loggedUserId: string): IGetFeedPostsResponse[] {
        var ls: IGetFeedPostsResponse[] = [];
        for (var i = 0; i < posts.length; i++) {
            var post = posts[i];

            var comments = this.getTotalComments(post);
            var likes = this.getTotalLikes(post);
            var likedByUser = this.isLikedByUser(post, loggedUserId);
            var user: IUserPost = this.getUserOfPost(post);

            var obj: IGetFeedPostsResponse = {
                content: post.content,
                publishDate: post.publishDate,
                user: user,
                id: post.id!.toString(),
                parentId: post.parentId,
                comments: comments,
                likes: likes,
                likedByUser: likedByUser,
            };

            ls.push(obj);
        }

        return ls;
    }

    private getUserOfPost(post: IPost) {
        var userPost = post.user;
        var user: IUserPost = {
            name: userPost.get('name'),
            userName: userPost.get('userName'),
            id: userPost.get('id').toString(),
        };
        return user;
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
