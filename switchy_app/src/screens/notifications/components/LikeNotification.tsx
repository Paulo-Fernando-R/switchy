import { Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import HyperlinkText from "../../../components/hypelinkText/HyperlinkText";
import timeAgoFormatter from "../../../../timeAgoFormatter";
import styles from "./notificationListItemStyles";
import { NotificationListItemProps } from "./NotificationListItem";
import appColors from "../../../styles/appColors";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function LikeNotification({ notification }: NotificationListItemProps) {

     const timeAgo = timeAgoFormatter(notification.createdAt);

    return (
        <TouchableOpacity style={styles.listItem} activeOpacity={0.8}>
            <View style={styles.itemAvatar}>
                <AntDesign name="heart" size={20} color={appColors.text100} />
            </View>

            <View style={styles.itemContent}>
                <View style={styles.itemTitle}>
                    <View style={styles.itemTitle}>
                        <Text style={styles.titleName}>{notification.sender.name}</Text>
                        <Text style={styles.titleUname}>@{notification.sender.userName}</Text>
                        <Text style={styles.titleUname}>{timeAgo}</Text>
                    </View>
                </View>
                <Text style={styles.titleReceiver}>Curtiu seu post</Text>
                <HyperlinkText text={notification.content?.text!} textStyle={styles.itemContentBodyDark} />
            </View>
        </TouchableOpacity>
    );
}

