import { Request, Response } from "express";
import postRepository from "../repositories/postRepository/postRepository";
import { IPost } from "../models/post";
import { Types } from "mongoose";
import { StatusCodes } from "../utils/status_codes";
import ServerError from "../errors/serverError";

export default class PostController {
    async createPost(req: Request, res: Response) {
        const { content, parentId } = req.body;
        const userId = req.userId;

        if (!content) {
            res.status(StatusCodes.BadRequest).send("content is required");
            return;
        }

        const post: IPost = {
            user: {
                email: "email",
                name: "name",
                id: new Types.ObjectId(userId as string),
            },
            comments: [],
            likes: [],
            content: content,
            publishDate: new Date(Date.now()),
            parentId: parentId ? parentId : null,
        };
        try {
            await postRepository.createPost(post);
            res.status(StatusCodes.Ok).send();
        } catch (error) {
            //@ts-ignore
            res.status(StatusCodes.InternalServerError).send(error.message);
        }
    }

    async getFeedPosts(req: Request, res: Response) {
        const userId = req.userId;

        try {
            const response = await postRepository.getFeedPosts(userId);
            res.status(StatusCodes.Ok).send(response);
        } catch (error) {
            res.status(StatusCodes.InternalServerError).send(error);
        }
    }

    async addCommentPost(req: Request, res: Response) {
        const { content, parentId } = req.body;
        const userId = req.userId;

        if (!content) {
            res.status(StatusCodes.BadRequest).send("content is required");
            return;
        }

        if (!parentId) {
            res.status(StatusCodes.BadRequest).send("parentId is required");
            return;
        }

        try {
            await postRepository.addCommentPost(parentId, content, userId);

            res.status(StatusCodes.Ok).send();
            return;
        } catch (error) {
            res.status(StatusCodes.InternalServerError).send(error);
        }
    }
    async getPostById(req: Request, res: Response) {
        const { postId } = req.params;
        try {
            const response = await postRepository.getPostById(postId);
            res.status(StatusCodes.Ok).send(response);
        } catch (error) {
            res.status(StatusCodes.InternalServerError).send(error);
        }
    }
}
