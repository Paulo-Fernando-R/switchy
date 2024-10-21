import { Request, Response } from "express";
import { PostRepository } from "../repositories/postRepository/postRepository";
import { StatusCodes } from "../utils/status_codes";
import IPostRepository from "../repositories/postRepository/IpostRepository";
import CreatePostCase from "../domain/post/cases/createPostCase";
import { PostEmptyValueError, UnableCreatePostError } from "../domain/post/errors/postErrors";

export default class PostController {
    postRepository: IPostRepository;
    createPostCase: CreatePostCase;

    constructor() {
        this.postRepository = new PostRepository();
        this.createPostCase = new CreatePostCase();
    }
    async createPost(req: Request, res: Response) {
        const { content, parentId } = req.body;
        const userId = req.userId;

        try {
            await this.createPostCase.execute(parentId, content, userId);
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
            const response = await this.postRepository.getFeedPosts(userId);
            res.status(StatusCodes.Ok).send(response);
        } catch (error) {
            res.status(StatusCodes.InternalServerError).send(error);
        }
    }

    async getPostById(req: Request, res: Response) {
        const { postId } = req.params;
        try {
            const response = await this.postRepository.getPostById(postId);
            res.status(StatusCodes.Ok).send(response);
        } catch (error) {
            res.status(StatusCodes.InternalServerError).send(error);
        }
    }
}
