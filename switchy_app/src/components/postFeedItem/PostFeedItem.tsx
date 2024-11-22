import { Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import { usePostsListContext } from "../../contexts/postsListContext";
import PostFeedItemController from "./postFeedItemController";
import HyperlinkText from "../hypelinkText/HyperlinkText";
import timeAgoFormatter from "../../../timeAgoFormatter";
import { Facebook } from "react-content-loader/native";
//@ts-ignore
import avatar from "../../../assets/icons/avatar.png";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useMutation } from "@tanstack/react-query";
import React, { ReactNode, useState } from "react";
import appColors from "../../styles/appColors";
import SnackBar from "../snackBar/SnackBar";
import styles from "./postFeedItemStyles";
import Post from "../../models/post";

type PostFeedItemProps = {
    item?: Post | undefined;
    error?: Error | null;
    actionModal?: ReactNode;
    moreActionsButton?: ReactNode;
    postWebView?: ReactNode;
    navigateComment?: ReactNode;
};

export default function PostFeedItem({
    item,
    error,
    actionModal,
    moreActionsButton,
    postWebView,
    navigateComment,
}: PostFeedItemProps) {
    if (!item || error) {
        return <PostFeedItemSkeleton />;
    }

    const controller = new PostFeedItemController();

    const { updateOne } = usePostsListContext();
    const [screenData, setScreenData] = useState(item);
    const [liked, setLiked] = useState(item.likedByUser ?? false);
    const [showSnackBar, setShowSnackBar] = useState(false);

    const timeAgo = timeAgoFormatter(item.publishDate);

    const {
        mutate,
        error: qError,
        isPending,
    } = useMutation({
        mutationKey: ["Post" + item.id],

        mutationFn: (state: boolean) => {
            return controller.handleLike(item.id!, setLiked, state, updateOne);
        },

        onSuccess: (data) => {
            setScreenData(data);
        },

        onError: () => {
            setShowSnackBar(true);
        },
    });

    return (
        <View style={styles.listItem}>
            {actionModal}
            <SnackBar.Error
                message={qError?.message ?? "Ocorreu um erro ao realizar a operação."}
                setVisible={setShowSnackBar}
                visible={showSnackBar}
                autoDismissible={true}
            />
            <View style={styles.itemAvatar}>
                <Image style={styles.avatarIcon} source={avatar} />
            </View>

            <View style={styles.itemContent}>
                <View style={styles.itemTitle}>
                    <View style={styles.itemTitle}>
                        <Text style={styles.titleName}>{screenData?.user.name}</Text>
                        <Text style={styles.titleUname}>@{screenData?.user.userName}</Text>
                        <Text style={styles.titleUname}>{timeAgo}</Text>
                    </View>

                    {moreActionsButton}
                </View>
                <HyperlinkText text={screenData?.content ?? ""} textStyle={styles.itemContentBody} />

                {postWebView}

                <View style={styles.itemContentActions}>
                    {liked ? (
                        <TouchableOpacity
                            disabled={isPending}
                            style={styles.contentActionButton}
                            onPress={() => mutate(false)}
                        >
                            <AntDesign name="heart" size={20} color={appColors.text100} />
                            <Text style={styles.contentActionText}>{screenData?.likes}</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            disabled={isPending}
                            style={styles.contentActionButton}
                            onPress={() => mutate(true)}
                        >
                            <AntDesign name="hearto" size={20} color={appColors.text100} />
                            <Text style={styles.contentActionText}>{screenData?.likes}</Text>
                        </TouchableOpacity>
                    )}

                    {navigateComment}
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
