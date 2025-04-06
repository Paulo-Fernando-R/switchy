import { TouchableOpacity, View, Text, Dimensions } from "react-native";
import styles from "./notificationListItemStyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import appColors from "../../../styles/appColors";
import { NotificationListItemProps } from "./NotificationListItem";
import timeAgoFormatter from "../../../../timeAgoFormatter";
import { useState } from "react";

export default function FollowNotification({
    notification,
    onNotificationClick,
}: NotificationListItemProps) {
    const timeAgo = timeAgoFormatter(notification.createdAt);
    //const action = () => onNotificationClick?.([notification.id]);
    const [read, setRead] = useState(notification.read);

    const action = () => {
        onNotificationClick?.([notification.id]);
        notification.read = true;
        setRead(true);
    };
    return (
        <TouchableOpacity style={styles.listItem} activeOpacity={0.8} onPress={action}>
            <View style={styles.itemAvatar}>
                <Ionicons name="person-add" size={20} color={appColors.text100} />
            </View>

            <View style={styles.itemContent}>
                <View style={styles.itemTitle}>
                    <View style={styles.itemTitle}>
                        <Text style={styles.titleName}>{notification.sender.name}</Text>
                        <Text style={styles.titleUname}>@{notification.sender.userName}</Text>
                        <Text style={styles.titleUname}>{timeAgo}</Text>
                    </View>
                </View>

                <Text style={styles.titleReceiver}>Começou a seguir você</Text>
            </View>
            {!read && <View style={styles.badge}></View>}
        </TouchableOpacity>
    );
}
