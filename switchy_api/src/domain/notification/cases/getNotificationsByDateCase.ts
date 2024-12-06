import { inject, injectable } from "inversify";
import INotificationRepository from "../../../repositories/notificationRepository/inotificationRepository";
import "reflect-metadata";
import INotificationResponse from "../responses/inotificationResponse";

@injectable()
export default class GetNotificationsByDateCase {

    private readonly notificationRepository: INotificationRepository;

    constructor(@inject('NotificationRepository') notificationRepository: INotificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    async execute(userId: string, dateStr: string): Promise<INotificationResponse[]> {
        const date = new Date(dateStr).getTime();
        const maps = await this.notificationRepository.getByUserAndDate(userId, date);

        const responses: INotificationResponse[] = maps.map((x) => {
            return {
                id: x.id!.toString(),
                sender: x.sender,
                receiver: x.receiver,
                read: x.read,
                type: x.type,
                createdAt: new Date(x.createdAt),
                content: x.content,
            };
        });

        return responses;
    }
}