import { Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
//@ts-ignore
import avatar from "../../../assets/icons/avatar.png";
import AntDesign from "@expo/vector-icons/AntDesign";
import appColors from "../../styles/appColors";
import styles from "./postFeedItemStyles";
import React, { useState } from "react";
import Post from "../../models/post";
import { Facebook } from "react-content-loader/native";
import timeAgoFormatter from "../../../timeAgoFormatter";
import { HomeNavigationProp } from "../../routes/types/navigationTypes";
import { useMutation } from "@tanstack/react-query";
import PostFeedItemController from "./postFeedItemController";
import SnackBar from "../snackBar/SnackBar";
import { CustomError } from "../../errors/customErrors";
type PostFeedItemProps = {
    item: Post | undefined;
    error?: Error | null;
    navigation?: HomeNavigationProp | undefined;
};

export default function PostFeedItem({ item, error, navigation }: PostFeedItemProps) {
    const controller = new PostFeedItemController();
    if (!item || error) {
        return <PostFeedItemSkeleton />;
    }

    const timeAgo = timeAgoFormatter(item.publishDate);
    const [liked, setLiked] = useState(false);
    const [showSnackBar, setShowSnackBar] = useState(false);

    function navigate() {
        navigation?.navigate("Comments", { post: item! });
    }

    const {
        data,
        mutate,
        isError,
        error: qError,
    } = useMutation({
        mutationFn: () => controller.handleLike(item.id!, setLiked),
        onError: () => {
            setShowSnackBar(true);
        },
    });

    function handleLike() {
        setLiked(!liked);
    }

    const msg = () => {
        if (qError && "screenMessage" in qError) {
            return (qError.screenMessage as string) ?? "";
        }
        return "";
    };
    return (
        <View style={styles.listItem}>
            <SnackBar.Error
                message={msg()}
                setVisible={setShowSnackBar}
                visible={showSnackBar}
                autoDismissible={true}
            />
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
