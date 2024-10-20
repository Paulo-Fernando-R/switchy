import { Types } from "mongoose";
import { IPost } from "../../models/post";
import { IUser } from "../../models/user";

export default interface IPostRepository {
    createPost(post: IPost): Promise<void>;
    getFeedPosts(userId: string): Promise<IPost[]>;
    addComment(parentId: string, content: string, user: IUser): Promise<IPost>;
    addCommentsToPost(parentId: String, commentId: String): Promise<void>;
    getPostById(id: string): Promise<IPost>;
    getPostComments(ids: Types.ObjectId[]): Promise<IPost[]>;
}
