import { Types } from "mongoose";
import { IPost } from "../../models/post";
import { IUser } from "../../models/user";

export default interface IPostRepository {
    createPost(post: IPost): Promise<Types.ObjectId>;
    getFeedPosts(userId: string, page: number, ids?: Types.ObjectId[]): Promise<IPost[]>;
    addCommentsToPost(parentId: String, commentId: String): Promise<void>;
    getPostById(id: string): Promise<IPost>;
    getPostComments(ids: Types.ObjectId[]): Promise<IPost[]>;
    addLike(postId: string, userId: string): Promise<void>;
    removeLike(postId: string, userId: string): Promise<void>;
    getUserPosts(userId: string, page: number): Promise<IPost[]>;
    deletePost(postId: string): Promise<void>
    updateUserPost(userId: string, user: IUser): Promise<void>;
    getAllByUser(userId: string): Promise<IPost[]>;
    deleteLikesByUser(userId: string): Promise<void>;
}
