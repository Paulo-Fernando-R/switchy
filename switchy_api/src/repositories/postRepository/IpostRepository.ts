import { IPost } from "../../models/post";

export default interface IPostRepository {
    createPost(post: IPost): Promise<void>;
    getFeedPosts(userId: string): Promise<IPost[]>;
    addCommentPost(parentId: string, content: string, userId: string): Promise<void>;
    getPostById(id: string): Promise<IPost>;
}
