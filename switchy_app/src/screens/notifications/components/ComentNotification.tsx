import { Text, View, TouchableOpacity } from "react-native";
import HyperlinkText from "../../../components/hypelinkText/HyperlinkText";
import timeAgoFormatter from "../../../../timeAgoFormatter";
import styles from "./notificationListItemStyles";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { NotificationListItemProps } from "./NotificationListItem";
import appColors from "../../../styles/appColors";
import { useState } from "react";

export default function ComentNotification({
    notification,
    onNotificationClick,
}: NotificationListItemProps) {
    const timeAgo = timeAgoFormatter(notification.createdAt);
    // const action = () => onNotificationClick?.([notification.id]);
    const [read, setRead] = useState(notification.read);

    const action = () => {
        onNotificationClick?.([notification.id]);
        notification.read = true;
        setRead(true);
    };
    return (
        <TouchableOpacity style={styles.listItem} activeOpacity={0.8} onPress={action}>
            <View style={styles.itemAvatar}>
                <FontAwesome name="comment" size={20} color={appColors.text100} />
            </View>

            <View style={styles.itemContent}>
                <View style={styles.itemTitle}>
                    <View style={styles.itemTitle}>
                        <Text style={styles.titleName}>{notification.sender.name}</Text>
                        <Text style={styles.titleUname}>@{notification.sender.userName}</Text>
                        <Text style={styles.titleUname}>{timeAgo}</Text>
                    </View>
                </View>
                <Text style={styles.titleReceiver}>
                    Em resposta a @{notification.receiver.userName}
                </Text>
                <HyperlinkText
                    text={notification.content?.text!}
                    textStyle={styles.itemContentBody}
                />
            </View>
            {!read && <View style={styles.badge}></View>}
        </TouchableOpacity>
    );
}
