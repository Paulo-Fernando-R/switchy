import Post from "../../models/post";

export default interface IGetPostByIdCase {
    execute(id: string): Promise<Post>
}