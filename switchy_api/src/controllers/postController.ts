import { Request, Response } from "express";
import { PostRepository } from "../repositories/postRepository/postRepository";
import { StatusCodes } from "../utils/status_codes";
import IPostRepository from "../repositories/postRepository/IpostRepository";
import CreatePostCase from "../domain/post/cases/createPostCase";
import { AddLikeToPostError, PostEmptyValueError, UnableCreatePostError } from "../domain/post/errors/postErrors";
import GetFeedPostsCase from "../domain/post/cases/getFeedPostsCase";
import getPostByIdCase from "../domain/post/cases/getPostByIdCase";
import AddLikeToPostCase from "../domain/post/cases/addLikeToPostCase";

export default class PostController {
    postRepository: IPostRepository;

    constructor() {
        this.postRepository = new PostRepository();
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

    async AddLikeToPost(req: Request, res: Response) {
        const { postId } = req.body;
        const userId = req.userId;

        try {
            await new AddLikeToPostCase(this.postRepository).execute(postId, userId);
            res.status(StatusCodes.Ok).send();
        } catch (error) {
            if (error instanceof PostEmptyValueError) {
                res.status(StatusCodes.BadRequest).send("postId is required");
            }
            if (error instanceof AddLikeToPostError) {
                res.status(StatusCodes.InternalServerError).send();
            }
        }
    }
}
