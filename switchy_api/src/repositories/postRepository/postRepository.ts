import DatabaseConnection from "../../database/databaseConnection";
import ServerError from "../../errors/serverError";
import { IPost, Post } from "../../models/post";
import IPostRepository from "./IpostRepository";

class PostRepository extends DatabaseConnection implements IPostRepository {
    constructor() {
        super();
    }

    async createPost(post: IPost) {
        try {
            await this.connect();

            const newPost = new Post({
                comments: post.comments,
                content: post.content,
                likes: post.likes,
                parentId: post.parentId,
                publishDate: post.publishDate,
                user: post.user,
            });

            const created = await newPost.save();
            const res: IPost = {
                id: created.id,
                user: created.user,
                parentId: created.parentId,
                publishDate: created.publishDate,
                content: created.content,
                comments: created.comments,
                likes: created.likes,
            };
            return res;
        } catch (error) {
            console.error(error);
            //@ts-ignore
            throw new ServerError(error.message ?? "");
        }
    }
}

export default new PostRepository();
