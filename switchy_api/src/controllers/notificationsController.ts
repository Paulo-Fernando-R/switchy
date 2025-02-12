import { Request, Response } from "express";
import { StatusCodes } from "../utils/status_codes";
import container from "../injection";
import { UserNotFoundError } from "../domain/user/errors/userErrors";
import MarkNotificationsWithReaderCase from "../domain/notification/cases/markNotificationsWithReaderCase";
import GetNotificationsByReceiverId from "../domain/notification/cases/getNotificationsByReceive";

export default class NotificationsController {
    private readonly markNotificationsWithReaderCase: MarkNotificationsWithReaderCase;
    private readonly getNotificationsByReceiverId: GetNotificationsByReceiverId;

    constructor() {
        this.markNotificationsWithReaderCase = container.get<MarkNotificationsWithReaderCase>('MarkNotificationsWithReaderCase');
        this.getNotificationsByReceiverId = container.get<GetNotificationsByReceiverId>('GetNotificationsByReceiverId');
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