import MoreActionsButton from "../../components/postFeedItem/privateComponents/MoreActionsButton";
import NavigateComment from "../../components/postFeedItem/privateComponents/NavigateComment";
import { ProfileNavigationProp, ProfileRouteProp } from "../../routes/types/navigationTypes";
import ModalButton from "../../components/bottomModal/privateComponents/ModalButton";
import { View, FlatList, ActivityIndicator, RefreshControl } from "react-native";
import QuestionPopup from "../../components/questionPopup/QuestionPopup";
import { usePostsListContext } from "../../contexts/postsListContext";
import PostFeedItem from "../../components/postFeedItem/PostFeedItem";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import PostWebView from "../../components/postWebView/PostWebView";
import BottomModal from "../../components/bottomModal/BottomModal";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useAuthContext } from "../../contexts/authContext";
import { useUserContext } from "../../contexts/userContext";
import EmptyList from "../../components/emptyList/EmpyList";
import React, { useEffect, useRef, useState } from "react";
import SnackBar from "../../components/snackBar/SnackBar";
import { Modalize } from "react-native-modalize";
import Header from "./privateComponents/Header";
import appColors from "../../styles/appColors";
import UserController from "./userController";
import styles from "./userStyles";

type ProfileProps = {
    navigation: ProfileNavigationProp;
    route: ProfileRouteProp;
};

export default function Profile({ navigation }: ProfileProps) {
    const controller = new UserController();

    const [errorSnackBar, setErrorSnackBar] = useState(false);
    const [snackBar, setSnackBar] = useState(false);
    const [popup, setPopup] = React.useState(false);

    const { posts, setPosts } = usePostsListContext();
    const { user, setUser } = useUserContext();
    const { setAuth } = useAuthContext();

    let currentSelectedItem = useRef<string>("");
    const modalizeRef = useRef<Modalize>(null);

    const query = useInfiniteQuery({
        queryKey: ["Profile"],
        queryFn: ({ pageParam }) => controller.getPosts(user?.id!, pageParam),
        placeholderData: () => ({ pageParams: [1], pages: [controller.placeholderData] }),
        getNextPageParam: controller.handleNext,
        initialPageParam: 1,
    });

    const mutation = useMutation({
        mutationFn: () => controller.deletePost(currentSelectedItem.current, setPopup, query.refetch),
        onError: () => setErrorSnackBar(true),
        onSuccess: () => setSnackBar(true),
    });

    function openModal(id: string | undefined) {
        modalizeRef.current?.open();
        currentSelectedItem.current = id!;
    }

    function navigate() {
        navigation.navigate("ProfileEdit");
    }

    function navigateComent(id: string | undefined) {
        if (id) navigation?.push("Comments", { postId: id });
    }

    async function logout() {
        await controller.logout(setUser, setAuth);
    }

    useEffect(() => {
        query.isSuccess && setPosts(query.data?.pages?.flat());
    }, [query.data]);

    return (
        <View style={styles.page}>
            <SnackBar.Error
                message={query.error?.message ?? ""}
                setVisible={setErrorSnackBar}
                visible={errorSnackBar}
                autoDismissible={true}
            />
            <SnackBar.Sucess
                message={"Publicação excluida com sucesso"}
                setVisible={setSnackBar}
                visible={snackBar}
                autoDismissible={true}
            />

            <FlatList
                data={posts}
                onEndReachedThreshold={0.8}
                contentContainerStyle={styles.list}
                onEndReached={() => query.fetchNextPage()}
                ListEmptyComponent={<EmptyList screenSizeDivider={2} />}
                ListFooterComponent={query.isFetchingNextPage ? <Footer /> : null}
                ListHeaderComponent={<Header user={user!} navigate={navigate} logout={logout} />}
                refreshControl={<RefreshControl refreshing={query.isRefetching} onRefresh={query.refetch} />}
                keyExtractor={(item, index) =>
                    `${item?.id}-${index}${item?.comments}${item?.likes}${item?.likedByUser}`
                }
                renderItem={({ item }) => (
                    <PostFeedItem
                        item={item}
                        error={query.error}
                        postWebView={<PostWebView text={item?.content} />}
                        moreActionsButton={<MoreActionsButton openModal={() => openModal(item?.id)} />}
                        navigateComment={
                            <NavigateComment commentsNumber={item?.comments} navigate={() => navigateComent(item.id)} />
                        }
                        actionModal={
                            <BottomModal modalizeRef={modalizeRef}>
                                <ModalButton
                                    action={() => setPopup(true)}
                                    text="Excluir"
                                    icon={<MaterialIcons name="delete-outline" size={24} color={appColors.text200} />}
                                />
                            </BottomModal>
                        }
                        popup={
                            <QuestionPopup
                                visibility={popup}
                                setVisibility={setPopup}
                                title="Excluir publicação?"
                                description="Tem certeza que deseja excluir essa publicação?"
                                action={() => mutation.mutate()}
                            />
                        }
                    />
                )}
            />
        </View>
    );
}

function Footer() {
    return <ActivityIndicator size="large" color={appColors.accent300} />;
}
