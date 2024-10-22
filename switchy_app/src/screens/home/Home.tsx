import { Text, View, Image, FlatList, RefreshControl } from "react-native";
import { HomeNavigationProp } from "../../routes/types/navigationTypes";
import PostFeedItem from "../../components/postFeedItem/PostFeedItem";
//@ts-ignore
import logo from "../../../assets/images/logo.png";
import { useQuery } from "@tanstack/react-query";
import HomeController from "./homeController";
import styles from "./homeStyles";
import React from "react";

type HomeProps = {
    navigation: HomeNavigationProp;
};

export default function Home({ navigation }: HomeProps) {
    const controller = new HomeController();

    const { data, error, refetch, isRefetching } = useQuery({
        queryKey: ["Feeds"],
        queryFn: () => controller.getAppData(),
    });

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
