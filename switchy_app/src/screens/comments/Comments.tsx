import { HomeNavigationProp, SearchCommentsRouteProp, SearchNavigationProp } from "../../routes/types/navigationTypes";
LogBox.ignoreLogs(["Non-serializable values were found in the navigation state. Check:"]);
import { View, Text, TextInput, TouchableOpacity, LogBox } from "react-native";
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
import React, { useState } from "react";
import styles from "./commentsStyles";

type CommentsProps = {
    route: CommentsRouteProp | SearchCommentsRouteProp;
    navigation: HomeNavigationProp | SearchNavigationProp;
};

export default function Comments({ route, navigation }: CommentsProps) {
    const controller = new CommentsController();
    const [content, setContent] = useState("");
    const [snackBar, setSnackBar] = useState(false);
    const { updateOne } = usePostsListContext();
    const { post } = route.params;

    const { data, refetch } = useQuery({
        queryKey: [`Comments${post.id}`],
        queryFn: () => controller.getComments(post.id!),
    });

    const mutation = useMutation({
        mutationFn: () => controller.createComment(content, post.id!, refetch, setContent, updateOne),
        onError: () => {
            setSnackBar(true);
        },
        onSuccess: () => {
            setSnackBar(true);
        },
    });

    function goBack() {
        navigation.goBack();
    }

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
                <PostFeedItem item={post} />
            </View>
            <Text style={styles.title}>Respostas</Text>

            <FlatList
                contentContainerStyle={styles.list}
                data={data}
                renderItem={({ item }) => <PostFeedItem item={item} navigation={navigation} />}
            />
            <View style={styles.inputBox}>
                <TextInput
                    placeholder="Responder"
                    placeholderTextColor={appColors.text300}
                    multiline={true}
                    style={styles.input}
                    onChangeText={(text) => setContent(text)}
                    value={content}
                />
                <TouchableOpacity disabled={mutation.isPending} activeOpacity={0.8} onPress={() => mutation.mutate()}>
                    <MaterialCommunityIcons name="send-outline" size={20} color={appColors.accent300} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
