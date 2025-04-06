import { inject, injectable } from "inversify";
import INotificationRepository from "../../../repositories/notificationRepository/inotificationRepository";
import { INotification } from "../../../models/notification";
import INotificationUser from "../../../models/notificationUser";
import { NotificationTypes } from "../../../utils/notificationTypes";
import "reflect-metadata";
import { Types } from "mongoose";

@injectable()
export default class NewFollowerNotificationCase {

    private readonly notificationRepository: INotificationRepository;

    constructor(@inject('NotificationRepository') notificationRepository: INotificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    async execute(followed: any, follower: any) {

        const sender: INotificationUser = {
            id: new Types.ObjectId(follower.id!),
            name: follower.name,
            userName: follower.userName!
        };

        const receiver: INotificationUser = {
            id: new Types.ObjectId(followed.id!),
            name: followed.name,
            userName: followed.userName!
        };

        const notification: INotification = {
            sender: sender,
            receiver: receiver,
            type: NotificationTypes.follow,
            read: false,
        };

        if (sender.id.toString() == receiver.id.toString()) {
            return;
        }

        await this.notificationRepository.create(notification);
    }
}