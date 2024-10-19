import Post from "../../models/post";

export default interface IPostRepository{
    getFeedPosts(): Promise<Post[]>
}