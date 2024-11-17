import { Text, View, Image, FlatList, RefreshControl, ActivityIndicator } from "react-native";
import { HomeNavigationProp } from "../../routes/types/navigationTypes";
import PostFeedItem from "../../components/postFeedItem/PostFeedItem";
import useLayoutFocus from "../../hooks/useLayoutFocus";
//@ts-ignore
import logo from "../../../assets/images/logo.png";
import { useInfiniteQuery } from "@tanstack/react-query";
import HomeController from "./homeController";
import React from "react";
import styles from "./homeStyles";
import appColors from "../../styles/appColors";
import { useUserContext } from "../../contexts/userContext";

type HomeProps = {
    navigation: HomeNavigationProp;
};

export default function Home({ navigation }: HomeProps) {
    const controller = new HomeController();
    const ref = useLayoutFocus();
    const { setUser } = useUserContext();

    const { data, error, fetchNextPage, isFetchingNextPage, refetch, isRefetching } = useInfiniteQuery({
        queryKey: ["Feed" + ref],
        queryFn: ({ pageParam }) => controller.getAppData(pageParam, setUser),
        initialPageParam: 1,
        getNextPageParam: controller.handleNext,
        placeholderData: () => ({ pageParams: [1], pages: [controller.placeholderData] }),
    });

    return (
        <FlatList
            refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
            ListHeaderComponent={() => <Header />}
            style={styles.page}
            contentContainerStyle={styles.list}
            data={data?.pages?.flat()}
            renderItem={({ item }) => <PostFeedItem item={item} error={error} navigation={navigation} />}
            onEndReachedThreshold={0.8}
            onEndReached={() => fetchNextPage()}
            ListFooterComponent={isFetchingNextPage ? <Footer /> : null}
        />
    );
}

function Footer() {
    return <ActivityIndicator size="large" color={appColors.accent300} />;
}

function Header() {
    return (
        <View style={styles.header}>
            <Image style={styles.logo} source={logo} />
            <Text style={styles.headerText}>Swithcy</Text>
        </View>
    );
}
