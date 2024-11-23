import IGetFeedPostsResponse from "../../domain/post/response/getFeedPostsResponse";
import { IPost } from "../../models/post";

export function getTotalComments(post: IPost) {
    var comments = 0;
    if (post.comments != null) {
        comments = post.comments?.length;
    }
    return comments;
}

export function getTotalLikes(post: IPost) {
    var likes = 0;
    if (post.likes != null) {
        likes = post.likes?.length;
    }
    return likes;
}

export function isLikedByUser(post: IPost, userId: string) {
    if (post.likes == null) {
        return false;
    }

    var likedByUser = post.likes.filter((like: any) => like.userId.equals(userId)).length > 0;
    return likedByUser;
}