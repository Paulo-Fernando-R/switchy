import { Text, View, Image, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
//@ts-ignore
import avatar from "../../../assets/icons/avatar.png";
import AntDesign from "@expo/vector-icons/AntDesign";
import appColors from "../../styles/appColors";
import styles from "./postFeedItemStyles";
import React, { useState } from "react";
import Post from "../../models/post";

type PostFeedItemProps = {
    item: Post | undefined;
};

export default function PostFeedItem({ item }: PostFeedItemProps) {
    if (!item) return null;
    const [liked, setLiked] = useState(false);
    const date = new Date(Date.now() - item?.publishDate.getUTCMilliseconds());
    function handleLike() {
        setLiked(!liked);
    }
    return (
        <View style={styles.listItem}>
            <View style={styles.itemAvatar}>
                <Image style={styles.avatarIcon} source={avatar} />
            </View>

            <View style={styles.itemContent}>
                <View style={styles.itemTitle}>
                    <Text style={styles.titleName}>{item?.user.name}</Text>

                    <Text style={styles.titleUname}>{item?.user.email}</Text>
                    <Text style={styles.titleUname}>{item?.publishDate.toTimeString()}</Text>
                </View>
                <Text style={styles.itemContentBody}>{item?.content}</Text>

                <View style={styles.itemContentActions}>
                    <TouchableOpacity style={styles.contentActionButton} onPress={handleLike}>
                        {liked ? (
                            <AntDesign name="heart" size={20} color={appColors.text100} />
                        ) : (
                            <AntDesign name="hearto" size={20} color={appColors.text100} />
                        )}

                        <Text style={styles.contentActionText}>{item?.likes?.length}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contentActionButton}>
                        <FontAwesome name="comment-o" size={20} color={appColors.text100} />
                        <Text style={styles.contentActionText}>{item?.comments?.length}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}