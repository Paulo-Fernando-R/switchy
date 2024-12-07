import { inject, injectable } from "inversify";
import INotificationRepository from "../../../repositories/notificationRepository/inotificationRepository";
import { INotification } from "../../../models/notification";
import INotificationUser from "../../../models/notificationUser";
import { NotificationTypes } from "../../../utils/notificationTypes";
import INotificationContent from "../../../models/notificationContent";
import "reflect-metadata";

@injectable()
export default class NewFollowerNotificationCase {

    private readonly notificationRepository: INotificationRepository;

    constructor(@inject('NotificationRepository') notificationRepository: INotificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    async execute(followed: any, follower: any) {

        const sender: INotificationUser = {
            id: follower.id!,
            name: follower.name,
            userName: follower.userName!
        };

        const receiver: INotificationUser = {
            id: followed.id!,
            name: followed.name,
            userName: followed.userName!
        };

        const notificationContent: INotificationContent = {
            title: 'Novo seguidor',
            text: `${sender.name} seguiu você!`,
        };

        const notification: INotification = {
            sender: sender,
            receiver: receiver,
            type: NotificationTypes.follow,
            content: notificationContent,
            read: false
        };


        await this.notificationRepository.create(notification);
    }
}