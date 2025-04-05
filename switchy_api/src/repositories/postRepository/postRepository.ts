import { injectable } from "inversify";
import DatabaseConnection from "../../database/databaseConnection";
import ServerError from "../../errors/serverError";
import { IPost, Post } from "../../models/post";
import { IUser } from "../../models/user";
import IPostRepository from "./IpostRepository";
import { Types } from "mongoose";
import "reflect-metadata";
import IPostUser from "../../models/postUser";

@injectable()
export class PostRepository extends DatabaseConnection implements IPostRepository {
    
    constructor() {
        super();
    }

    async getUserFromPost(postId: string): Promise<IPostUser | null> {
        await this.connect();
        const post = await Post.findById(postId).exec();
        if (post == null) return null;

        const json = post?.toJSON();
        const user = json.user;
        
        const response: IPostUser = {
            id: user.id,
            name: user.name,
            userName: user.userName
        }
        
        return response;
    }

    async getUserPosts(userId: string, page: number) {
        const skip = (page - 1) * 10;

        await this.connect();

        const list = await Post.find({ "user.id": new Types.ObjectId(userId), deleted: false }, null, {
            skip: skip,
            limit: 10,
            sort: { publishDate: -1 },
        });

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
    }

    async addLike(postId: string, userId: string): Promise<void> {
        await this.connect();
        await Post.findByIdAndUpdate(postId, {
            $push: { likes: { userId: userId } },
        });
    }

    async removeLike(postId: string, userId: string): Promise<void> {
        await this.connect();
        await Post.findByIdAndUpdate(postId, {
            $pull: { likes: { userId: userId } },
        });
    }

    async getPostComments(ids: Types.ObjectId[]): Promise<IPost[]> {
        await this.connect();

        const res = await Post.find({
            deleted: false,
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

    async createPost(post: IPost): Promise<Types.ObjectId> {
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
        var id = created._id;
        return id;
    }

    async getFeedPosts(userId: string, page: number, ids: Types.ObjectId[]) {
        if (!ids || ids.length == 0) {
            return await this.getFeedPostsWithoutCriteria(page);
        }
        return await this.getFeedPostsWithCriteria(page, ids);
    }

    private async getFeedPostsWithoutCriteria(page: number) {
        const skip = (page - 1) * 10;
        try {
            await this.connect();
            const list = await Post.find({ parentId: null, deleted: false }, null, {
                skip: skip,
                limit: 10,
                sort: { publishDate: -1 },
            }).exec();
            //console.log(list);

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

    private async getFeedPostsWithCriteria(page: number, ids: Types.ObjectId[]) {
        const skip = (page - 1) * 10;
        await this.connect();

        try {
            const res = await Post.find({ parentId: null, deleted: false }, null, {
                _id: {
                    $in: ids,
                },
                skip: skip,
                limit: 10,
                sort: { publishDate: -1 },
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

    async addCommentsToPost(parentId: string, commentId: string): Promise<void> {
        await this.connect();

        await Post.findByIdAndUpdate(parentId, {
            $push: { comments: { postId: commentId, deleted: false } },
        });
    }

    async getPostById(id: string) {
        try {
            await this.connect();
            const post = await Post.findById(id).exec();
            const json = post?.toJSON();
            
            const response: IPost = {
                id: json?._id,
                content: json?.content ?? "",
                parentId: json?.parentId,
                publishDate: json?.publishDate!,
                user: json?.user!,
                comments: json?.comments,
                likes: json?.likes,
            }
           
            return response;
        } catch (error) {
            console.error(error);
            //@ts-ignore
            throw new ServerError(error.message ?? "");
        }
    }

    async deletePost(postId: string) {
        await this.connect();
        await Post.findByIdAndUpdate(postId, { deleted: true });
        await Post.updateOne({"comments.postId": new Types.ObjectId(postId) }, {$set: {"comments.$.deleted": true}})
    }

    async updateUserPost(userId: string, user: IUser) {
        await Post.updateMany({ "user.id": new Types.ObjectId(userId) }, { $set: { user: user } });
    }

    async getAllByUser(userId: string): Promise<IPost[]> {
        const list = await Post.find({ "user.id": new Types.ObjectId(userId), deleted: false }, null, null);

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
    }

    async deleteLikesByUser(userId: string): Promise<void> {
        await Post.updateMany({"likes.userId": new Types.ObjectId(userId) }, {$set: {"likes.$.deleted": true}})
    }
}
