import { Request, Response } from "express";
import {PostRepository} from "../repositories/postRepository/postRepository";
import { IPost } from "../models/post";
import { Types } from "mongoose";
import { StatusCodes } from "../utils/status_codes";
import IPostRepository from "../repositories/postRepository/IpostRepository";

export default class PostController {
    postRepository: IPostRepository

    constructor(){
        this.postRepository = new PostRepository();
    }
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
            await this.postRepository.createPost(post);
            res.status(StatusCodes.Ok).send();
        } catch (error) {
            //@ts-ignore
            res.status(StatusCodes.InternalServerError).send(error.message);
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
