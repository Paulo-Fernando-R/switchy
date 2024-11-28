import { Types } from "mongoose";
import IPostRepository from "../../../repositories/postRepository/IpostRepository";
import IUserRepository from "../../../repositories/userRepository/IuserRepository";
import { IPost } from "../../../models/post";
import IGetFeedPostsResponse from "../response/getFeedPostsResponse";
import { getTotalComments, getTotalLikes, isLikedByUser } from "../../../helpers/post/posthelpers";
import "reflect-metadata";
import { inject, injectable } from "inversify";

@injectable()
export default class GetFeedPostsCase {
    private readonly postRepository: IPostRepository;
    private readonly userRepository: IUserRepository;

    constructor(
        @inject('PostRepository') _postRepository: IPostRepository, 
        @inject('UserRepository') _userRepository: IUserRepository) {
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

            var comments = getTotalComments(post);
            var likes = getTotalLikes(post);
            var likedByUser = isLikedByUser(post, loggedUserId);

            var obj: IGetFeedPostsResponse = {
                content: post.content,
                publishDate: post.publishDate,
                user: post.user,
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
}
