import { Text, View, Image, FlatList, RefreshControl } from "react-native";
import { HomeNavigationProp } from "../../routes/types/navigationTypes";
import PostFeedItem from "../../components/postFeedItem/PostFeedItem";
import useLayoutFocus from "../../hooks/useLayoutFocus";
//@ts-ignore
import logo from "../../../assets/images/logo.png";
import { useQuery } from "@tanstack/react-query";
import HomeController from "./homeController";
import React from "react";
import styles from "./homeStyles";

type HomeProps = {
    navigation: HomeNavigationProp;
};

export default function Home({ navigation }: HomeProps) {
    const controller = new HomeController();
    const ref = useLayoutFocus();
    const { data, error, refetch, isRefetching, isLoading } = useQuery({
        queryKey: ["Feed" + ref],
        queryFn: () => controller.getAppData(),
        placeholderData: controller.placeholderData,
        refetchOnWindowFocus: true
    });

    //console.log(data[0])

    return (
        <FlatList
            refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
            ListHeaderComponent={() => <Header />}
            style={styles.page}
            contentContainerStyle={styles.list}
            data={data}
            renderItem={({ item, index }) => <PostFeedItem item={item} error={error} navigation={navigation} />}
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
