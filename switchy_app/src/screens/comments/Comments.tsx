import { HomeNavigationProp, SearchCommentsRouteProp, SearchNavigationProp } from "../../routes/types/navigationTypes";
LogBox.ignoreLogs(["Non-serializable values were found in the navigation state. Check:"]);
import { View, Text, TextInput, TouchableOpacity, LogBox, ActivityIndicator } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { CommentsRouteProp } from "../../routes/types/navigationTypes";
import PostFeedItem from "../../components/postFeedItem/PostFeedItem";
import { usePostsListContext } from "../../contexts/postsListContext";
import BackButton from "../../components/backButton/BackButton";
import { useQuery, useMutation } from "@tanstack/react-query";
import SnackBar from "../../components/snackBar/SnackBar";
import { FlatList } from "react-native-gesture-handler";
import CommentsController from "./commentsController";
import appColors from "../../styles/appColors";
import React, { useEffect, useState } from "react";
import styles from "./commentsStyles";
import useLayoutFocus from "../../hooks/useLayoutFocus";
import { RefreshControl } from "react-native";
import useKeyboard from "../../hooks/useKeyboard";
import KeyboardStateEnum from "../../enums/keyboardStateEnum";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

type CommentsProps = {
    route: CommentsRouteProp | SearchCommentsRouteProp;
    navigation: HomeNavigationProp | SearchNavigationProp;
};

export default function Comments({ route, navigation }: CommentsProps) {
    const controller = new CommentsController();

    const [content, setContent] = useState("");
    const [snackBar, setSnackBar] = useState(false);

    const { updateOne } = usePostsListContext();
    const { postId } = route.params;
    const keyBoard = useKeyboard() === KeyboardStateEnum.show;
    const transLateY = useSharedValue(0);
    const ref = useLayoutFocus();

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: withSpring(transLateY.value) }],
    }));

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

    useEffect(() => {
        transLateY.value = keyBoard ? -30 : 0;
    }, [keyBoard]);

    return (
        <View style={styles.page}>
            {mutation.isError && (
                <SnackBar.Error
                    message={mutation.error?.message!}
                    setVisible={setSnackBar}
                    visible={snackBar}
                    autoDismissible={true}
                />
            )}
            {mutation.isSuccess && (
                <SnackBar.Sucess
                    message={"Comentário publicado"}
                    setVisible={setSnackBar}
                    visible={snackBar}
                    autoDismissible={true}
                />
            )}

            <View style={styles.header}>
                <BackButton goBack={goBack} />
            </View>
            <View style={styles.mainPost}>
                <PostFeedItem item={mainPostQuery.data} />
            </View>
            <Text style={styles.title}>Respostas</Text>

            <FlatList
                refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
                contentContainerStyle={styles.list}
                data={data}
                renderItem={({ item }) => <PostFeedItem item={item} navigation={navigation} />}
                keyExtractor={(item, index) =>
                    `${item?.id}-${index}${item?.comments}${item?.likes}${item?.likedByUser}`
                }
            />
            <Animated.View style={[styles.inputBox, animatedStyles]}>
                <TextInput
                    placeholder="Responder"
                    placeholderTextColor={appColors.text300}
                    multiline={true}
                    style={styles.input}
                    onChangeText={(text) => setContent(text)}
                    value={content}
                />
                <TouchableOpacity disabled={mutation.isPending} activeOpacity={0.8} onPress={() => mutation.mutate()}>
                    {mutation.isPending ? (
                        <ActivityIndicator size="small" color={appColors.accent300} />
                    ) : (
                        <MaterialCommunityIcons name="send-outline" size={20} color={appColors.accent300} />
                    )}
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}
