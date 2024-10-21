import DatabaseConnection from "../../database/databaseConnection";
import ServerError from "../../errors/serverError";
import { IPost, Post } from "../../models/post";
import { IUser } from "../../models/user";
import IPostRepository from "./IpostRepository";
import { Types } from "mongoose";

export class PostRepository extends DatabaseConnection implements IPostRepository {
    constructor() {
        super();
    }
    async addLikeToPost(postId: string, userId: string ): Promise<void> {
        await this.connect();

        await Post.findByIdAndUpdate(postId, {
            $push: { likes: { postId: postId } },
        });
    }

    async getPostComments(ids: Types.ObjectId[]): Promise<IPost[]> {
        await this.connect();

        const res = await Post.find({
            _id: {
                $in: ids,
            },
        }).exec();

        const posts = res.map((e) => {
            const aux: IPost = {
                content: e.content,
                publishDate: e.publishDate,
                user: e.user,
                id: e._id,
                parentId: e.parentId,
                comments: e.comments,
                likes: e.likes,
            };
            return aux;
        });

        return posts;
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

            if (!created) {
                throw new ServerError("unnable to insert");
            }
            const res: IPost = {
                id: created.id,
                user: created.user,
                parentId: created.parentId,
                publishDate: created.publishDate,
                content: created.content,
                comments: created.comments,
                likes: created.likes,
            };
            console.log(res);
        } catch (error) {
            console.error(error);
            //@ts-ignore
            throw new ServerError(error.message ?? "");
        }
    }

    async getFeedPosts(userId: string) {
        try {
            await this.connect();
            const list = await Post.find({ parentId: null }).exec();
            console.log(list);

            const res: IPost[] = list.map((e) => {
                return {
                    content: e.content,
                    publishDate: e.publishDate,
                    user: e.user,
                    id: e._id,
                    parentId: e.parentId,
                    comments: e.comments,
                    likes: e.likes,
                };
            });
            return res;
        } catch (error) {
            console.error(error);
            //@ts-ignore
            throw new ServerError(error.message ?? "");
        }
    }

    async addComment(parentId: string, content: string, user: IUser): Promise<IPost> {
        await this.connect();

        const newPost = new Post({
            content: content,
            parentId: parentId,
            user: {
                email: user?.email,
                name: user?.name,
                id: new Types.ObjectId(user.id),
            },
        });

        const res = await newPost.save();

        const result: IPost = {
            id: res._id,
            user: res.user,
            publishDate: res.publishDate,
            content: res.content,
        };
        return result;
    }

    async addCommentsToPost(parentId: String, commentId: String): Promise<void> {
        await this.connect();

        await Post.findByIdAndUpdate(parentId, {
            $push: { comments: { postId: commentId } },
        });
    }

    async getPostById(id: string) {
        try {
            await this.connect();
            const post = await Post.findById(id).exec();
            console.log(post?.user);
            const res: IPost = {
                id: post?._id,
                content: post?.content ?? "",
                parentId: post?.parentId ?? "",
                publishDate: post?.publishDate ?? new Date(),
                user: post?.user!,
                comments:
                    post?.comments?.map((e) => {
                        return { postId: e.postId };
                    }) ?? [],
                likes: post?.likes ?? [],
            };
            return res;
        } catch (error) {
            console.error(error);
            //@ts-ignore
            throw new ServerError(error.message ?? "");
        }
    }
}