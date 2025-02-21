import { TouchableOpacity, View, Text, Dimensions } from "react-native";
import styles from "./notificationListItemStyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import appColors from "../../../styles/appColors";
import { NotificationListItemProps } from "./NotificationListItem";
import { Facebook } from "react-content-loader/native";
import timeAgoFormatter from "../../../../timeAgoFormatter";

export default function FollowNotification({ notification }: NotificationListItemProps) {

    const timeAgo = timeAgoFormatter(notification.createdAt);

    return (
        <TouchableOpacity style={styles.listItem} activeOpacity={0.8}>
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
        </TouchableOpacity>
    );
}

