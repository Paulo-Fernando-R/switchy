import { inject, } from "inversify";
import { Types } from "mongoose";
import INotificationUser from "../../../models/notificationUser";
import IGetPostByIdResponse from "../../post/response/getPostByIdResponse";
import IUserByIdResponse from "../../user/responses/userByIdResponse";
import "reflect-metadata";
import INotificationRepository from "../../../repositories/notificationRepository/inotificationRepository";
import { INotification } from "../../../models/notification";
import { NotificationTypes } from "../../../utils/notificationTypes";
import INotificationContent from "../../../models/notificationContent";

export default class NewLikeNotificationCase {
    private readonly notificationRepository: INotificationRepository;

    constructor(@inject('NotificationRepository') notificationRepository: INotificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    async execute(senderUser: IUserByIdResponse, post: IGetPostByIdResponse) {
        const sender: INotificationUser = {
            id: new Types.ObjectId(senderUser.id),
            name: senderUser.name,
            userName: senderUser.userName
        };

        const receiverUser = post.user;
        const receiver: INotificationUser = {
            id: receiverUser.id,
            name: receiverUser.name,
            userName: receiverUser.userName,
        };

        const content: INotificationContent = {
            text: post.content
        };

        const notification: INotification = {
            sender: sender,
            receiver: receiver,
            type: NotificationTypes.like,
            read: false,
            content: content,
        };

        if (sender.id.toString() == receiver.id.toString()) {
            return;
        }

        await this.notificationRepository.create(notification);
    }
}