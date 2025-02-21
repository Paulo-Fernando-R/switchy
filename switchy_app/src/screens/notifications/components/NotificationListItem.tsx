import React from "react";
import NotificationTypeEnum from "../../../enums/notificationTypeEnum";
import Notification from "../../../models/notification";
import ComentNotification from "./ComentNotification";
import FollowNotification from "./FollowNotification";
import LikeNotification from "./LikeNotification";
import { Facebook } from "react-content-loader/native";
import appColors from "../../../styles/appColors";
import { Dimensions } from "react-native";

export type NotificationListItemProps = {
    notification: Notification;
};

export default function NotificationListItem({ notification }: NotificationListItemProps) {
    if (!notification) {
        return <PostFeedItemSkeleton />;
    }

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

function PostFeedItemSkeleton() {
    return (
        <Facebook
            backgroundColor={appColors.bg300}
            foregroundColor={appColors.primary200}
            width={Dimensions.get("window").width}
        />
    );
}
