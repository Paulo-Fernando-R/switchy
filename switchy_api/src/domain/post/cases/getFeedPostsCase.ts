import { Types } from "mongoose";
import IPostRepository from "../../../repositories/postRepository/IpostRepository";
import IUserRepository from "../../../repositories/userRepository/IuserRepository";
import { IPost } from "../../../models/post";
import IUserPost from "../entities/userPost";
import IGetFeedPostsResponse from "../response/getFeedPostsResponse";

export default class GetFeedPostsCase {
    private readonly postRepository: IPostRepository;
    private readonly userRepository: IUserRepository;

    constructor(_postRepository: IPostRepository, _userRepository: IUserRepository) {
        this.postRepository = _postRepository;
        this.userRepository = _userRepository;
    }

    async execute(userId: string, page: number) {
        const loggedUser = await this.userRepository.getById(userId);
        const followings = loggedUser?.following;

        if (!followings || followings.length == 0) {
            const posts = await this.postRepository.getFeedPosts(userId, page);
            const response = this.parsePostsToResponse(posts, userId);
            return response;
        }

        const ids = followings.map((e) => new Types.ObjectId(e.userId));
        const posts = await this.postRepository.getFeedPosts(userId, page, ids);

        var ls = this.parsePostsToResponse(posts, userId);
        return ls;
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
