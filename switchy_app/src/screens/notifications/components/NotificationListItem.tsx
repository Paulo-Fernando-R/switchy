import React from "react";
import NotificationTypeEnum from "../../../enums/notificationTypeEnum";
import Notification from "../../../models/notification";
import ComentNotification from "./ComentNotification";
import FollowNotification from "./FollowNotification";
import LikeNotification from "./LikeNotification";

export type NotificationListItemProps = {
    notification: Notification;
};

export default function NotificationListItem({ notification }: NotificationListItemProps) {
    if (notification.type === NotificationTypeEnum.postLike) {
        return <LikeNotification notification={notification} />;
    }

    if (notification.type === NotificationTypeEnum.postComment) {
        return <ComentNotification notification={notification} />;
    }

    if (notification.type === NotificationTypeEnum.follow) {
        return <FollowNotification notification={notification} />;
    }
}
