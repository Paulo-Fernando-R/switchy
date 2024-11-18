import Post from "../../models/post";

export default interface IPostRepository{
    getFeedPosts(page: number): Promise<Post[]>
    getPostComments(postId: string): Promise<Post[]>
    createPost(content: string, parentId: string): Promise<void>
    addLike(postId:string, value:boolean):Promise<void>
    getPostById(postId: string): Promise<Post>
    getUserPosts(userId: string, page: number): Promise<Post[]>
    newPost(content: string): Promise<void>
}