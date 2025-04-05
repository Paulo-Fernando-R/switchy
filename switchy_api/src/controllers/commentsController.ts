import { Request, Response } from "express";
import { StatusCodes } from "../utils/status_codes";
import GetUserByIdCase from "../domain/user/cases/getUserByIdCase";
import { UserError } from "../domain/user/errors/userErrors";
import SaveCommentCase from "../domain/post/cases/saveCommentCase";
import { PostError } from "../domain/post/errors/postErrors";
import GetCommentsCase from "../domain/post/cases/getCommentsCase";
import { IUser } from "../models/user";
import { Types } from "mongoose";
import container from "../injection";
import NewCommentNotificationCase from "../domain/notification/cases/newCommentNotificationCase";
import GetUserByPostIdCase from "../domain/user/cases/getUserByPostCase";

export default class CommentsController {
    private readonly getUserByIdCase: GetUserByIdCase;
    private readonly saveCommentCase: SaveCommentCase;
    private readonly getCommentsCase: GetCommentsCase;
    private readonly newCommentNotificationCase: NewCommentNotificationCase;
    private readonly getUserByPostIdCase: GetUserByPostIdCase;

    constructor() {
        this.getUserByIdCase = container.get<GetUserByIdCase>('GetUserByIdCase');
        this.saveCommentCase = container.get<SaveCommentCase>('SaveCommentCase');
        this.getCommentsCase = container.get<GetCommentsCase>('GetCommentsCase');
        this.newCommentNotificationCase = container.get<NewCommentNotificationCase>('NewCommentNotificationCase');
        this.getUserByPostIdCase = container.get<GetUserByPostIdCase>('GetUserByPostIdCase');
    }

    async add(req: Request, res: Response) {
        const { content, parentId } = req.body;
        const userId = req.userId;

        try {
            const user = await this.getUserByIdCase.execute(userId);

            const aux: IUser = {
                email: user.email,
                name: user.name,
                userName: user.userName,
                id: new Types.ObjectId(user.id as string),
            };
            await this.saveCommentCase.execute(content, parentId, aux);

            const userReceiver = await this.getUserByPostIdCase.execute(parentId);
            await this.newCommentNotificationCase.execute(content, user, userReceiver)

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
        const userId = req.userId;

        const response = await this.getCommentsCase.execute(postId, userId);
        res.status(StatusCodes.Ok).send(response);
    }
}
