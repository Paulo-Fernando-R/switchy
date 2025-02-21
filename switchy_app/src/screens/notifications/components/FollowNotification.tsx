import { TouchableOpacity, View, Text, Dimensions } from "react-native";
import styles from "./notificationListItemStyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import appColors from "../../../styles/appColors";
import { NotificationListItemProps } from "./NotificationListItem";
import { Facebook } from "react-content-loader/native";
import timeAgoFormatter from "../../../../timeAgoFormatter";

export default function FollowNotification({ notification }: NotificationListItemProps) {
    if (!notification) {
        return <PostFeedItemSkeleton />;
    }
    // const timeAgo = timeAgoFormatter(item.publishDate);

    return (
        <TouchableOpacity style={styles.listItem} activeOpacity={0.8}>
            <View style={styles.itemAvatar}>
                <Ionicons name="person-add" size={20} color={appColors.text100} />
            </View>

            <View style={styles.itemContent}>
                <View style={styles.itemTitle}>
                    <View style={styles.itemTitle}>
                        <Text style={styles.titleName}>name</Text>
                        <Text style={styles.titleUname}>@username</Text>
                        <Text style={styles.titleUname}>timeAgo</Text>
                    </View>
                </View>

                <Text style={styles.titleReceiver}>Começou a seguir você</Text>
            </View>
        </TouchableOpacity>
    );
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
