import DatabaseConnection from "../../database/databaseConnection";
import ServerError from "../../errors/serverError";
import { IPost, Post } from "../../models/post";
import IPostRepository from "./IpostRepository";
import { User } from "../../models/user";
import { Types } from "mongoose";

export class PostRepository extends DatabaseConnection implements IPostRepository {
    constructor() {
        super();
    }
    async getPostComments(id: string): Promise<IPost[]> {
        try {
            await this.connect();
            const post = await Post.findById(id).exec();
            const comments = post?.comments;

            if (!comments) {
                return [];
            }

            const res = await Post.find({
                _id: {
                    $in: comments?.map((e) => new Types.ObjectId(e.postId)),
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
        } catch (error) {
            console.error(error);
            //@ts-ignore
            throw new ServerError(error.message ?? "");
        }
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
                    id: e.id,
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

    async addCommentPost(parentId: string, content: string, userId: string) {
        try {
            await this.connect();
            const user = await User.findById(userId).exec();

            const newPost = new Post({
                content: content,
                parentId: parentId,
                user: {
                    email: user?.email,
                    name: user?.name,
                    id: new Types.ObjectId(userId),
                },
            });

            const res = await newPost.save();

            if (res) {
                await Post.findByIdAndUpdate(parentId, {
                    $push: { comments: { postId: res._id.toString() } },
                });
                console.log(res);
                return;
            }
            throw new ServerError("unnable to insert");
        } catch (error) {
            console.error(error);
            //@ts-ignore
            throw new ServerError(error.message ?? "");
        }
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

//new PostRepository();
