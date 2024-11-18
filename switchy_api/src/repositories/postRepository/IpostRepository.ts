import { Types } from "mongoose";
import { IPost } from "../../models/post";
import { IUser } from "../../models/user";

export default interface IPostRepository {
    createPost(post: IPost): Promise<void>;
    getFeedPosts(userId: string, page: number, ids?: Types.ObjectId[]): Promise<IPost[]>;
    addComment(parentId: string, content: string, user: IUser): Promise<IPost>;
    addCommentsToPost(parentId: String, commentId: String): Promise<void>;
    getPostById(id: string): Promise<IPost>;
    getPostComments(ids: Types.ObjectId[]): Promise<IPost[]>;
    addLike(postId: string, userId: string): Promise<void>;
    removeLike(postId: string, userId: string): Promise<void>;
    getUserPosts(userId: string, page: number): Promise<IPost[]>;
}
