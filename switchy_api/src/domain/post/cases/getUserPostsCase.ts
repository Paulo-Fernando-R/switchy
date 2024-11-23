import { inject, injectable } from "inversify";
import { getTotalComments, getTotalLikes, isLikedByUser } from "../../../helpers/post/posthelpers";
import { IPost } from "../../../models/post";
import IPostRepository from "../../../repositories/postRepository/IpostRepository";
import IGetFeedPostsResponse from "../response/getFeedPostsResponse";
import "reflect-metadata";

@injectable()
export default class GetUserPostsCase {
    private readonly postRepository: IPostRepository;

    constructor(@inject('PostRepository') _postRepository: IPostRepository) {
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
