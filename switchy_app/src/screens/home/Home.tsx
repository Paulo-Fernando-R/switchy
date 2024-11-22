import { Text, View, Image, FlatList, RefreshControl, ActivityIndicator } from "react-native";
import { HomeNavigationProp } from "../../routes/types/navigationTypes";
import { usePostsListContext } from "../../contexts/postsListContext";
import PostFeedItem from "../../components/postFeedItem/PostFeedItem";
import { useUserContext } from "../../contexts/userContext";
import EmptyList from "../../components/emptyList/EmpyList";
import { useInfiniteQuery } from "@tanstack/react-query";
//@ts-ignore
import logo from "../../../assets/images/logo.png";
import appColors from "../../styles/appColors";
import HomeController from "./homeController";
import React, { useEffect } from "react";
import styles from "./homeStyles";
import PostWebView from "../../components/postWebView/PostWebView";

type HomeProps = {
    navigation: HomeNavigationProp;
};

export default function Home({ navigation }: HomeProps) {
    const controller = new HomeController();
    const { setUser } = useUserContext();
    const { posts, setPosts } = usePostsListContext();

    const { isSuccess, data, error, fetchNextPage, isFetchingNextPage, refetch, isRefetching } = useInfiniteQuery({
        queryKey: ["Feed"],
        queryFn: ({ pageParam }) => controller.getAppData(pageParam, setUser),
        initialPageParam: 1,
        getNextPageParam: controller.handleNext,
        placeholderData: () => ({ pageParams: [1], pages: [controller.placeholderData] }),
    });

    useEffect(() => {
        isSuccess && setPosts(data?.pages?.flat());
    }, [data]);

    return (
        <FlatList
            ListEmptyComponent={EmptyList}
            refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
            ListHeaderComponent={() => <Header />}
            style={styles.page}
            contentContainerStyle={styles.list}
            data={posts}
            renderItem={({ item }) => (
                <PostFeedItem
                    item={item}
                    error={error}
                    navigation={navigation}
                    postWebView={<PostWebView text={item.content} />}
                />
            )}
            onEndReachedThreshold={0.8}
            onEndReached={() => fetchNextPage()}
            ListFooterComponent={isFetchingNextPage ? <Footer /> : null}
            keyExtractor={(item, index) => `${item?.id}-${index}${item?.comments}${item?.likes}${item?.likedByUser}`}
        />
    );
}

function Header() {
    return (
        <View style={styles.header}>
            <Image style={styles.logo} source={logo} />
            <Text style={styles.headerText}>Swithcy</Text>
        </View>
    );
}

function Footer() {
    return <ActivityIndicator size="large" color={appColors.accent300} />;
}
