import { Request, Response } from "express";
import { StatusCodes } from "../utils/status_codes";
import GetUserByIdCase from "../domain/user/cases/getUserByIdCase";
import container from "../injection";
import { UserNotFoundError } from "../domain/user/errors/userErrors";
import GetNotificationsByDateCase from "../domain/notification/cases/getNotificationsByDateCase";

export default class NotificationsController {
    private readonly getUserByIdCase: GetUserByIdCase;
    private readonly getNotificationsByDateCase: GetNotificationsByDateCase;

    constructor() {
        this.getUserByIdCase = container.get<GetUserByIdCase>('GetUserByIdCase');
        this.getNotificationsByDateCase = container.get<GetNotificationsByDateCase>('GetNotificationsByDateCase');
    }

    async getByDate(req: Request, res: Response) {
        const { lastDate } = req.params;
        const userId = req.userId;

        try {
            const user = await this.getUserByIdCase.execute(userId);
            const response = await this.getNotificationsByDateCase.execute(user.id, lastDate);
    
            res.status(StatusCodes.Ok).send(response);
        } catch (ex) {
            if (ex instanceof UserNotFoundError) {
                res.status(StatusCodes.Unauthorized).send();
            }
        }
    }
}