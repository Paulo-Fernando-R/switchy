import { Request, Response } from "express";
import postRepository from "../repositories/postRepository/postRepository";
import { IPost } from "../models/post";
import { Types } from "mongoose";
import { StatusCodes } from "../utils/status_codes";

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
            const response = await postRepository.createPost(post);
            res.status(StatusCodes.Ok).send(response);
        } catch (error) {
            //@ts-ignore
            res.status(StatusCodes.InternalServerError).send(error.message);
        }
    }
}
