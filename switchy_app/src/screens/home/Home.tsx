import PostFeedItem from "../../components/postFeedItem/PostFeedItem";
import { Text, View, Image, FlatList, RefreshControl } from "react-native";
//@ts-ignore
import logo from "../../../assets/images/logo.png";
import { useQuery } from "@tanstack/react-query";
import HomeController from "./homeController";
import styles from "./homeStyles";
import React from "react";

export default function Home() {
    const controller = new HomeController();

    const { data, error, refetch, isRefetching } = useQuery({
        queryKey: ["Feeds"],
        queryFn: () => controller.getFeedData(),
    });

    //console.log(data, error);
    return (
        <FlatList
            refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
            ListHeaderComponent={() => <Header />}
            style={styles.page}
            contentContainerStyle={styles.list}
            data={data}
            renderItem={({ item, index }) => <PostFeedItem item={item} error={error} />}
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
