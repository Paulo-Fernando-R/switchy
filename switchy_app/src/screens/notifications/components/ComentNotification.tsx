import { Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import HyperlinkText from "../../../components/hypelinkText/HyperlinkText";
import timeAgoFormatter from "../../../../timeAgoFormatter";
import { Facebook } from "react-content-loader/native";
import styles from "./notificationListItemStyles";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { NotificationListItemProps } from "./NotificationListItem";
import appColors from "../../../styles/appColors";

export default function ComentNotification({ notification }: NotificationListItemProps) {
    if (!notification) {
        return <PostFeedItemSkeleton />;
    }
    // const timeAgo = timeAgoFormatter(item.publishDate);

    return (
        <TouchableOpacity style={styles.listItem} activeOpacity={0.8}>
            <View style={styles.itemAvatar}>
                <FontAwesome name="comment" size={24} color={appColors.text100} />
            </View>

            <View style={styles.itemContent}>
                <View style={styles.itemTitle}>
                    <View style={styles.itemTitle}>
                        <Text style={styles.titleName}>name</Text>
                        <Text style={styles.titleUname}>@username</Text>
                        <Text style={styles.titleUname}>timeAgo</Text>
                    </View>
                </View>
                <Text style={styles.titleReceiver}>Em resposta a @username</Text>
                <HyperlinkText text={"content aqui"} textStyle={styles.itemContentBody} />
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
