import { inject, injectable } from "inversify";
import INotificationRepository from "../../../repositories/notificationRepository/inotificationRepository";
import { INotification } from "../../../models/notification";
import INotificationUser from "../../../models/notificationUser";
import { NotificationTypes } from "../../../utils/notificationTypes";
import "reflect-metadata";
import { Types } from "mongoose";
import INotificationContent from "../../../models/notificationContent";

@injectable()
export default class NewCommentNotificationCase {

    private readonly notificationRepository: INotificationRepository;

    constructor(@inject('NotificationRepository') notificationRepository: INotificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    async execute(postContent: any, userSender: any, userReceiver: any) {
        const sender: INotificationUser = {
            id: new Types.ObjectId(userSender.id!),
            name: userSender.name,
            userName: userSender.userName!
        };

        const receiver: INotificationUser = {
            id: new Types.ObjectId(userReceiver.id!.toString()),
            name: userReceiver.name,
            userName: userReceiver.userName!
        };

        const content: INotificationContent = {
            text: postContent,
        };
        const notification: INotification = {
            sender: sender,
            receiver: receiver,
            type: NotificationTypes.comment,
            read: false,
            content: content
        };

        if (sender.id.toString() == receiver.id.toString()) {
            return;
        }

        await this.notificationRepository.create(notification);
    }
}