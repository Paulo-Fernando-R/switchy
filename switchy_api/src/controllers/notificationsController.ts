import { Request, Response } from "express";
import { StatusCodes } from "../utils/status_codes";
import GetUserByIdCase from "../domain/user/cases/getUserByIdCase";
import container from "../injection";
import { UserNotFoundError } from "../domain/user/errors/userErrors";
import GetNotificationsByDateCase from "../domain/notification/cases/getNotificationsByDateCase";
import MarkNotificationsWithReaderCase from "../domain/notification/cases/markNotificationsWithReaderCase";
import GetNotificationsByReceiverId from "../domain/notification/cases/getNotificationsByReceive";

export default class NotificationsController {
    private readonly getUserByIdCase: GetUserByIdCase;
    private readonly getNotificationsByDateCase: GetNotificationsByDateCase;
    private readonly markNotificationsWithReaderCase: MarkNotificationsWithReaderCase;
    private readonly getNotificationsByReceiverId: GetNotificationsByReceiverId;

    constructor() {
        this.getUserByIdCase = container.get<GetUserByIdCase>('GetUserByIdCase');
        this.getNotificationsByDateCase = container.get<GetNotificationsByDateCase>('GetNotificationsByDateCase');
        this.markNotificationsWithReaderCase = container.get<MarkNotificationsWithReaderCase>('MarkNotificationsWithReaderCase');
        this.getNotificationsByReceiverId = container.get<GetNotificationsByReceiverId>('GetNotificationsByReceiverId');
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

    async putReader(req: Request, res: Response) {
        const { ids } = req.body;

        await this.markNotificationsWithReaderCase.execute(ids);
        
        res.status(StatusCodes.Ok).send();
    }

    async getLastEntriesByUser(req: Request, res: Response) {
        const userId = req.userId;

        const { lastEntries, skip } = req.params;
        const numberOfEntries = parseInt(lastEntries);
        const numberToSkip = parseInt(skip);

        try {
            const response = await this.getNotificationsByReceiverId.execute(userId, numberOfEntries, numberToSkip);
            res.status(StatusCodes.Ok).send(response);
        } catch (ex) {
            if (ex instanceof UserNotFoundError) {
                res.status(StatusCodes.Unauthorized).send();
            }
            throw ex;
        }
    }
}