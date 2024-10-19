import Post from "../../models/post";

export default interface IPostRepository{
    getFeedPosts(): Promise<Post[]>
    getPostComments(postId: string): Promise<Post[]>
    createPost(content: string, parentId: string): Promise<void>
}