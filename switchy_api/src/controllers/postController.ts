import { Request, Response } from "express";
import { PostRepository } from "../repositories/postRepository/postRepository";
import { StatusCodes } from "../utils/status_codes";
import IPostRepository from "../repositories/postRepository/IpostRepository";
import CreatePostCase from "../domain/post/cases/createPostCase";
import { PostEmptyValueError, UnableCreatePostError } from "../domain/post/errors/postErrors";
import GetFeedPostsCase from "../domain/post/cases/getFeedPostsCase";
import getPostByIdCase from "../domain/post/cases/getPostByIdCase";
import UpdateLikeOfPostCase from "../domain/post/cases/updateLikeOfPostCase";
import GetUserPostsCase from "../domain/post/cases/getUserPostsCase";

export default class PostController {
    postRepository: IPostRepository;
    getUserPostsCase: GetFeedPostsCase;

    constructor() {
        this.postRepository = new PostRepository();
        this.getUserPostsCase = new GetFeedPostsCase(this.postRepository);
    }
    async createPost(req: Request, res: Response) {
        const { content, parentId } = req.body;
        const userId = req.userId;

        try {
            await new CreatePostCase(this.postRepository).execute(parentId, content, userId);
            res.status(StatusCodes.Ok).send();
        } catch (error) {
            if (error instanceof PostEmptyValueError) {
                res.status(StatusCodes.BadRequest).send("content is required");
            }
            if (error instanceof UnableCreatePostError) {
                res.status(StatusCodes.InternalServerError).send();
            }
        }
    }

    async getFeedPosts(req: Request, res: Response) {
        const userId = req.userId;

        try {
            const response = await new GetFeedPostsCase(this.postRepository).execute(userId);

            res.status(StatusCodes.Ok).send(response);
        } catch (error) {
            res.status(StatusCodes.InternalServerError).send(error);
        }
    }

    async getPostById(req: Request, res: Response) {
        const { postId } = req.params;

        try {
            const response = await new getPostByIdCase(this.postRepository).execute(postId);
            res.status(StatusCodes.Ok).send(response);
        } catch (error) {
            res.status(StatusCodes.InternalServerError).send(error);
        }
    }

    async putLike(req: Request, res: Response) {
        const { postId, value } = req.body;
        const userId = req.userId;

        try {
            await new UpdateLikeOfPostCase(this.postRepository).execute(postId, userId, value);
            res.status(StatusCodes.Ok).send();
        } catch (error) {
            if (error instanceof PostEmptyValueError) {
                res.status(StatusCodes.BadRequest).send("postId is required");
            }
        }
    }

    async getUserPosts(req: Request, res: Response) {
        const id = req.userId;
        try {
            const list = await this.getUserPostsCase.execute(id);
            res.status(StatusCodes.Ok).send(list);
        } catch (error) {
            res.status(StatusCodes.InternalServerError).send(error);
        }
    }
}
