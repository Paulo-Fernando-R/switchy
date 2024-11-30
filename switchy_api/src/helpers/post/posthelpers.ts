import { IPost } from "../../models/post";

export function getTotalComments(post: IPost) {
    if (!post.comments || post.comments.length === 0) {
        return 0;
    }

    var comments = getTotal<(typeof post.comments)[0]>(post.comments);
    return comments;
}

export function getTotalLikes(post: IPost) {
    if (!post.likes || post.likes.length === 0) {
        return 0;
    }
    var likes = getTotal<(typeof post.likes)[0]>(post.likes);
    return likes;
}

export function isLikedByUser(post: IPost, userId: string) {
    var likedByUser = post.likes!.some((like) => like.userId == userId);
    return likedByUser;
}

function getTotal<T extends Object>(list: T[]): number {
    let total = filterNotDeleted<T>(list!);
    return total.length;
}

function filterNotDeleted<T extends Object>(list: T[]) {
    const arr = list.filter((item: T) => {
        if ("deleted" in item) {
            return !item.deleted;
        }
    });

    return arr;
}
