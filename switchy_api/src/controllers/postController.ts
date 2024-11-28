import { Request, Response } from "express";
import { StatusCodes } from "../utils/status_codes";
import CreatePostCase from "../domain/post/cases/createPostCase";
import { PostEmptyValueError, UnableCreatePostError } from "../domain/post/errors/postErrors";
import GetFeedPostsCase from "../domain/post/cases/getFeedPostsCase";
import GetPostByIdCase from "../domain/post/cases/getPostByIdCase";
import UpdateLikeOfPostCase from "../domain/post/cases/updateLikeOfPostCase";
import GetUserPostsCase from "../domain/post/cases/getUserPostsCase";
import DeletePostCase from "../domain/post/cases/deletePostCase";
import GetUserByIdCase from "../domain/user/cases/getUserByIdCase";
import { UserNotFoundError } from "../domain/user/errors/userErrors";
import IPostUser from "../models/postUser";
import { Types } from "mongoose";
import container from "../injection";

export default class PostController {
    private getUserPostsCase: GetUserPostsCase;
    private getFeedPostsCase: GetFeedPostsCase;
    private deletePostCase: DeletePostCase;
    private getUserByIdCase: GetUserByIdCase;
    private createPostCase: CreatePostCase;
    private getPostByIdCase: GetPostByIdCase;
    private updateLikeOfPostCase: UpdateLikeOfPostCase;

    constructor() {
        this.getUserPostsCase = container.get<GetUserPostsCase>('GetUserPostsCase');
        this.getFeedPostsCase = container.get<GetFeedPostsCase>('GetFeedPostsCase');
        this.deletePostCase = container.get<DeletePostCase>('DeletePostCase');
        this.getUserByIdCase = container.get<GetUserByIdCase>('GetUserByIdCase');
        this.createPostCase = container.get<CreatePostCase>('CreatePostCase');
        this.getPostByIdCase = container.get<GetPostByIdCase>('GetPostByIdCase');
        this.updateLikeOfPostCase = container.get<UpdateLikeOfPostCase>('UpdateLikeOfPostCase');
    }

    async createPost(req: Request, res: Response) {
        const { content, parentId } = req.body;
        const userId = req.userId;

        try {
            const user = await this.getUserByIdCase.execute(userId);

            var postUser: IPostUser = {
                id: new Types.ObjectId(user.id!.toString()),
                name: user.name,
                userName: user.userName!,
            };

            await this.createPostCase.execute(parentId, content, postUser);
            
            res.status(StatusCodes.Ok).send();
        } catch (error) {
            if (error instanceof PostEmptyValueError) {
                res.status(StatusCodes.BadRequest).send("content is required");
            }
            if (error instanceof UnableCreatePostError) {
                res.status(StatusCodes.InternalServerError).send();
            } else if (error instanceof UserNotFoundError) {
                res.status(StatusCodes.InternalServerError).send();
            }
        }
    }

    async getFeedPosts(req: Request, res: Response) {
  
        const userId = req.userId;
        const { page } = req.params;
        let pageInt: number = 1;
        if (page) pageInt = parseInt(page);

        const response = await this.getFeedPostsCase.execute(userId, pageInt);

        res.status(StatusCodes.Ok).send(response);
    }

    async getPostById(req: Request, res: Response) {
        const { postId } = req.params;
        const userId = req.userId;

        try {
            const response = await this.getPostByIdCase.execute(postId, userId);
            res.status(StatusCodes.Ok).send(response);
        } catch (error) {
            res.status(StatusCodes.InternalServerError).send(error);
        }
    }

    async putLike(req: Request, res: Response) {
        const { postId, value } = req.body;
        const userId = req.userId;

        try {
            await this.updateLikeOfPostCase.execute(postId, userId, value);
            res.status(StatusCodes.Ok).send();
        } catch (error) {
            if (error instanceof PostEmptyValueError) {
                res.status(StatusCodes.BadRequest).send("postId is required");
            }
        }
    }

    async getUserPosts(req: Request, res: Response) {
        const { userId, page } = req.params;
        let pageInt: number = 1;
        if (page) pageInt = parseInt(page);

        const list = await this.getUserPostsCase.execute(userId, pageInt);
        res.status(StatusCodes.Ok).send(list);
    }

    async deletePost(req: Request, res: Response) {
        const { postId } = req.params;

        try {
            if (!postId) throw new PostEmptyValueError();
            await this.deletePostCase.execute(postId);
            res.status(StatusCodes.Ok).send();
        } catch (error) {
            if (error instanceof PostEmptyValueError) {
                res.status(StatusCodes.BadRequest).send("postId is required");
                return;
            }
            res.status(StatusCodes.InternalServerError).send(error);
        }
    }
}
