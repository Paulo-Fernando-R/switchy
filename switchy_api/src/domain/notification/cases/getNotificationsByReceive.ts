import { inject, injectable } from "inversify";
import INotificationRepository from "../../../repositories/notificationRepository/inotificationRepository";
import "reflect-metadata";
import INotificationResponse from "../responses/inotificationResponse";
import { INotification } from "../../../models/notification";
import { NotificationTypes } from "../../../utils/notificationTypes";

@injectable()
export default class GetNotificationsByReceiverId {
    private readonly notificationRepository: INotificationRepository;

    constructor(@inject("NotificationRepository") notificationRepository: INotificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    async execute(userId: string, page: number): Promise<INotificationResponse[]> {
        const notifications = await this.notificationRepository.getRecentsByReciever(userId, page);

        const response: INotificationResponse[] = notifications.map((x: INotification) => {
            var content = x.content ? x.content : null;
            
            return {
                id: x.id!.toString(),
                sender: x.sender,
                receiver: x.receiver,
                read: x.read,
                type: x.type,
                createdAt: new Date(x.createdAt!),
                content:content
            };
        });
        return response;
    }
}
