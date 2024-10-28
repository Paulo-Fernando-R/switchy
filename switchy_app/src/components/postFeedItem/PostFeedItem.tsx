import { Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import { HomeNavigationProp, ProfileNavigationProp, SearchNavigationProp } from "../../routes/types/navigationTypes";
import PostFeedItemController from "./postFeedItemController";
import { useUserContext } from "../../contexts/userContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import timeAgoFormatter from "../../../timeAgoFormatter";
import { Facebook } from "react-content-loader/native";
//@ts-ignore
import avatar from "../../../assets/icons/avatar.png";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useMutation } from "@tanstack/react-query";
import appColors from "../../styles/appColors";
import SnackBar from "../snackBar/SnackBar";
import styles from "./postFeedItemStyles";
import React, { useState } from "react";
import Post from "../../models/post";

type PostFeedItemProps = {
    item?: Post | undefined;
    error?: Error | null;
    navigation?: HomeNavigationProp | SearchNavigationProp | ProfileNavigationProp | undefined;
};

export default function PostFeedItem({ item, error, navigation }: PostFeedItemProps) {
    if (!item || error) {
        return <PostFeedItemSkeleton />;
    }
    const controller = new PostFeedItemController();

    const { user } = useUserContext();
    const timeAgo = timeAgoFormatter(item.publishDate);
    const [liked, setLiked] = useState(controller.getInitialLike(item, user));
    const [showSnackBar, setShowSnackBar] = useState(false);

    const {
        data,
        mutate,
        error: qError,
    } = useMutation({
        mutationFn: () => controller.handleLike(item.id!, setLiked, !liked),
        onError: () => {
            setShowSnackBar(true);
        },
    });

    const msg = controller.getErrorMessage(qError);

    function navigate() {
        //@ts-ignore
        navigation?.navigate("Comments", { post: data ? data : item! });
    }

    return (
        <View style={styles.listItem} >
            <SnackBar.Error message={msg} setVisible={setShowSnackBar} visible={showSnackBar} autoDismissible={true} />
            <View style={styles.itemAvatar}>
                <Image style={styles.avatarIcon} source={avatar} />
            </View>

            <View style={styles.itemContent}>
                <View style={styles.itemTitle}>
                    <Text style={styles.titleName}>{data ? data.user.name : item.user.name}</Text>

                    <Text style={styles.titleUname}>{data ? data.user.email : item.user.email}</Text>
                    <Text style={styles.titleUname}>{timeAgo}</Text>
                </View>
                <Text style={styles.itemContentBody}>{data ? data.content : item?.content}</Text>

                <View style={styles.itemContentActions}>
                    <TouchableOpacity style={styles.contentActionButton} onPress={() => mutate()}>
                        {liked ? (
                            <AntDesign name="heart" size={20} color={appColors.text100} />
                        ) : (
                            <AntDesign name="hearto" size={20} color={appColors.text100} />
                        )}

                        <Text style={styles.contentActionText}>{data ? data.likes?.length : item.likes?.length}</Text>
                    </TouchableOpacity>

                    {navigation ? (
                        <TouchableOpacity style={styles.contentActionButton} onPress={navigate}>
                            <FontAwesome name="comment-o" size={20} color={appColors.text100} />
                            <Text style={styles.contentActionText}>
                                {data ? data.comments?.length : item.comments?.length}
                            </Text>
                        </TouchableOpacity>
                    ) : null}
                </View>
            </View>
        </View>
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
