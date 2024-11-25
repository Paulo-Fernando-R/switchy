import { IPost } from "../../models/post";

export function getTotalComments(post: IPost) {
    var comments = getTotal(post.comments);
    return comments;
}

export function getTotalLikes(post: IPost) {
    var likes = getTotal(post.likes);
    return likes;
}

export function isLikedByUser(post: IPost, userId: string) {
    if (post.likes == null || post.likes == undefined) {
        return false;
    }

    var likedByUser = post.likes.filter((like: any) => like.userId.equals(userId)).length > 0;
    return likedByUser;
}

function getTotal(ls: any[] | undefined): number {
    if (ls == undefined || ls == null || ls.length) {
        return 0;
    }

    let cn = filterNotDeleted(ls);
    return cn;
}

function filterNotDeleted(ls: any) {
    return ls ? ls.filter((ls: any) => !ls.deleted) : [];
}