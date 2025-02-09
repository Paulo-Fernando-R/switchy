import React from "react";
import NotificationTypeEnum from "../../../enums/notificationTypeEnum";
import Notification from "../../../models/notification";
import { Text, View } from "react-native";
import ComentNotification from "./ComentNotification";

export type NotificationListItemProps = {
    notification: Notification;
};

export default function NotificationListItem({ notification }: NotificationListItemProps) {
    if (notification.type === NotificationTypeEnum.postLike) {
        return <Text>NotificationListItem Post Like</Text>;
    }

    if (notification.type === NotificationTypeEnum.postComment) {
        return <ComentNotification notification={notification}/>;
    }

    if (notification.type === NotificationTypeEnum.follow) {
        return <Text>NotificationListItem Follow</Text>;
    }
}
