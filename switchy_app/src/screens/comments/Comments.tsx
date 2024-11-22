import {
    HomeNavigationProp,
    SearchCommentsRouteProp,
    SearchNavigationProp,
    ProfileNavigationProp,
} from "../../routes/types/navigationTypes";
import { View } from "react-native";
import { CommentsRouteProp } from "../../routes/types/navigationTypes";
import PostFeedItem from "../../components/postFeedItem/PostFeedItem";
import { usePostsListContext } from "../../contexts/postsListContext";
import { useQuery, useMutation } from "@tanstack/react-query";
import { FlatList } from "react-native-gesture-handler";
import CommentsController from "./commentsController";
import React, { useState } from "react";
import styles from "./commentsStyles";
import useLayoutFocus from "../../hooks/useLayoutFocus";
import { RefreshControl } from "react-native";
import InputArea from "./privateComponents/InputArea";
import TopArea from "./privateComponents/TopArea";
import PostWebView from "../../components/postWebView/PostWebView";
import NavigateComment from "../../components/postFeedItem/privateComponents/NavigateComment";

type CommentsProps = {
    route: CommentsRouteProp | SearchCommentsRouteProp;
    navigation: HomeNavigationProp | SearchNavigationProp | ProfileNavigationProp;
};

export default function Comments({ route, navigation }: CommentsProps) {
    const controller = new CommentsController();

    const [content, setContent] = useState("");
    const [snackBar, setSnackBar] = useState(false);

    const { updateOne } = usePostsListContext();
    const { postId } = route.params;

    const ref = useLayoutFocus();

    const { data, refetch, isRefetching } = useQuery({
        queryKey: [`Comments${postId}${ref}`],
        queryFn: () => controller.getComments(postId),
    });

    const mainPostQuery = useQuery({
        queryKey: [`MainPost${postId}${ref}`],
        queryFn: () => controller.getMainPost(postId),
    });

    const mutation = useMutation({
        mutationFn: () => controller.createComment(content, postId, refetch, setContent, updateOne),
        onError: () => {
            setSnackBar(true);
        },
        onSuccess: () => {
            setSnackBar(true);
        },
    });

    function goBack() {
        navigation.pop(1);
    }
    function navigate(id: string | undefined) {
        //@ts-ignore
        if (id) navigation.push("Comments", { postId: id });
    }

    return (
        <View style={styles.page}>
            <TopArea
                errorMessage={mutation.error?.message}
                isError={mutation.isError}
                isSuccess={mutation.isSuccess}
                visible={snackBar}
                setVisible={setSnackBar}
                item={mainPostQuery.data}
                goBack={goBack}
            />

            <FlatList
                refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
                contentContainerStyle={styles.list}
                data={data}
                renderItem={({ item, index }) => (
                    <PostFeedItem
                        navigateComment={
                            <NavigateComment commentsNumber={item?.comments} navigate={() => navigate(item?.id)} />
                        }
                        item={item}
                        postWebView={<PostWebView text={item.content} key={index} />}
                    />
                )}
                keyExtractor={(item, index) =>
                    `${item?.id}-${index}${item?.comments}${item?.likes}${item?.likedByUser}`
                }
            />

            <InputArea
                action={() => mutation.mutate()}
                isLoading={mutation.isPending}
                placeholder="Responder"
                setValue={setContent}
                value={content}
            />
        </View>
    );
}
