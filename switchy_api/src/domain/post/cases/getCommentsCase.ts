import { Types } from "mongoose";
import IPostRepository from "../../../repositories/postRepository/IpostRepository";
import { IPost } from "../../../models/post";
import GetPostsResponse from "../response/getFeedPostsResponse";
import IGetFeedPostsResponse from "../response/getFeedPostsResponse";
import { getTotalComments, getTotalLikes, isLikedByUser } from "../../../helpers/post/posthelpers";

export default class GetCommentsCase {
    private readonly postRepository: IPostRepository;

    constructor(postRepository: IPostRepository) {
        this.postRepository = postRepository;
    }

    async execute(id: string, userId: string): Promise<GetPostsResponse[]> {
        const post = await this.postRepository.getPostById(id);
        const comments = post.comments;
        if (!comments || comments.length == 0) {
            return [];
        }

        const ids = comments.map((e) => new Types.ObjectId(e.postId));
        const posts = await this.postRepository.getPostComments(ids);

        var ls: IGetFeedPostsResponse[] = [];
        for (var i = 0; i < posts.length; i++) {
            var item = posts[i];

            var totalComments = getTotalComments(item);
            var likes = getTotalLikes(item);
            var likedByUser = isLikedByUser(item, userId);

            var obj: IGetFeedPostsResponse = {
                content: item.content,
                publishDate: item.publishDate,
                user: item.user,
                id: item.id!.toString(),
                parentId: item.parentId,
                comments: totalComments,
                likes: likes,
                likedByUser: likedByUser,
            };

            ls.push(obj);
        }

        return ls;
    }
}
