import { Request, Response } from "express";
import { StatusCodes } from "../utils/status_codes";
import IPostRepository from "../repositories/postRepository/IpostRepository";
import { PostRepository } from "../repositories/postRepository/postRepository";
import GetUserByIdCase from "../domain/user/cases/getUserByIdCase";
import { UserError } from "../domain/user/errors/userErrors";
import IUserRepository from "../repositories/userRepository/IuserRepository";
import UserRepository from "../repositories/userRepository/userRepository";
import SaveCommentCase from "../domain/post/cases/saveCommentCase";
import { PostError } from "../domain/post/errors/postErrors";
import GetCommentsCase from "../domain/post/cases/getCommentsCase";

export default class CommentsController {
    private readonly postRepository: IPostRepository;
    private readonly userRepository: IUserRepository;

    constructor() {
        this.postRepository = new PostRepository();
        this.userRepository = new UserRepository();
    }

    async add(req: Request, res: Response) {
        const { content, parentId } = req.body;
        const userId = req.userId;

        try {
            const user = await new GetUserByIdCase(this.userRepository).execute(userId);
            await new SaveCommentCase(this.postRepository).execute(content, parentId, user);

            res.status(StatusCodes.Ok).send();
        } catch (ex) {
            if (ex instanceof UserError) {
                res.status(StatusCodes.NotFound).send();
                return;
            } else if (ex instanceof PostError) {
                res.status(StatusCodes.BadRequest).send();
                return;
            }

            throw ex;
        }
    }

    async getByPost(req: Request, res: Response) {
        const { postId } = req.params;

        const response = await new GetCommentsCase(this.postRepository).execute(postId);
        res.status(StatusCodes.Ok).send(response);
    }
}