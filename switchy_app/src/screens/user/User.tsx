import { ProfileNavigationProp, ProfileRouteProp } from "../../routes/types/navigationTypes";
import { Text, View, FlatList, ActivityIndicator, RefreshControl } from "react-native";
import PostFeedItem from "../../components/postFeedItem/PostFeedItem";
import { useUserContext } from "../../contexts/userContext";
import EmptyList from "../../components/emptyList/EmpyList";
import { useInfiniteQuery } from "@tanstack/react-query";
import appColors from "../../styles/appColors";
import UserController from "./userController";
import User from "../../models/user";
import styles from "./userStyles";
import React, { useEffect, useRef } from "react";
import { usePostsListContext } from "../../contexts/postsListContext";
import NavigateComment from "../../components/postFeedItem/privateComponents/NavigateComment";
import BottomModal from "../../components/bottomModal/BottomModal";
import { Modalize } from "react-native-modalize";
import PostWebView from "../../components/postWebView/PostWebView";
import MoreActionsButton from "../../components/postFeedItem/privateComponents/MoreActionsButton";
import ModalButton from "../../components/bottomModal/privateComponents/ModalButton";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import QuestionPopup from "../../components/questionPopup/QuestionPopup";
import Header from "./privateComponents/Header";

type ProfileProps = {
    navigation: ProfileNavigationProp;
    route: ProfileRouteProp;
};

export default function Profile({ navigation }: ProfileProps) {
    const controller = new UserController();

    const { user } = useUserContext();
    const { posts, setPosts } = usePostsListContext();
    const modalizeRef = useRef<Modalize>(null);

    const { data, isSuccess, error, fetchNextPage, isFetchingNextPage, isRefetching, refetch } = useInfiniteQuery({
        queryKey: ["Profile"],
        queryFn: ({ pageParam }) => controller.getPosts(user?.id!, pageParam),
        placeholderData: () => ({ pageParams: [1], pages: [controller.placeholderData] }),
        getNextPageParam: controller.handleNext,
        initialPageParam: 1,
    });

    const [popup, setPopup] = React.useState(false);
    function openPopup() {
        setPopup(true);
        modalizeRef.current?.close();
    }

    function navigate() {
        navigation.navigate("ProfileEdit");
    }

    function navigateComent(id: string | undefined) {
        if (id) navigation?.push("Comments", { postId: id });
    }

    useEffect(() => {
        isSuccess && setPosts(data?.pages?.flat());
    }, [data]);

    return (
        <View style={styles.page}>
            {/* <Header user={user!} navigate={navigate} /> */}
          

            <FlatList
            ListHeaderComponent={ <Header user={user!} navigate={navigate} />}
                ListEmptyComponent={EmptyList}
                refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
                contentContainerStyle={styles.list}
                data={posts}
                renderItem={({ item }) => (
                    <PostFeedItem
                        item={item}
                        error={error}
                        postWebView={<PostWebView text={item?.content} />}
                        moreActionsButton={<MoreActionsButton modalizeRef={modalizeRef} />}
                        navigateComment={
                            <NavigateComment
                                commentsNumber={item?.comments}
                                navigate={() => navigateComent(item?.id)}
                            />
                        }
                        actionModal={
                            <BottomModal
                                modalizeRef={modalizeRef}
                                popup={
                                    <QuestionPopup
                                        visibility={popup}
                                        setVisibility={setPopup}
                                        title="Excluir publicação?"
                                        description="Tem certeza que deseja excluir essa publicação?"
                                        action={() => alert("Excluir")}
                                    />
                                }
                            >
                                <ModalButton
                                    action={openPopup}
                                    text="Excluir"
                                    icon={<MaterialIcons name="delete-outline" size={24} color={appColors.text200} />}
                                />
                            </BottomModal>
                        }
                    />
                )}
                onEndReachedThreshold={0.8}
                onEndReached={() => fetchNextPage()}
                ListFooterComponent={isFetchingNextPage ? <Footer /> : null}
                keyExtractor={(item, index) =>
                    `${item?.id}-${index}${item?.comments}${item?.likes}${item?.likedByUser}`
                }
            />
        </View>
    );
}

function Footer() {
    return <ActivityIndicator size="large" color={appColors.accent300} />;
}
