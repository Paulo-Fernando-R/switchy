import { IPost } from "../../models/post";

export default interface IPostRepository{
    createPost(post: IPost): Promise<IPost>
}