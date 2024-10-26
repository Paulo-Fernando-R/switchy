import { Text, View, Image, FlatList, RefreshControl } from "react-native";
import { HomeNavigationProp } from "../../routes/types/navigationTypes";
import PostFeedItem from "../../components/postFeedItem/PostFeedItem";
import { useFocusEffect } from "@react-navigation/native";
//@ts-ignore
import logo from "../../../assets/images/logo.png";
import { useQuery } from "@tanstack/react-query";
import HomeController from "./homeController";
import React, { useCallback } from "react";
import styles from "./homeStyles";
import { useRef } from "react";

type HomeProps = {
    navigation: HomeNavigationProp;
};

export default function Home({ navigation }: HomeProps) {
    const controller = new HomeController();
    const ref = useRef(0);
    const { data, error, refetch, isRefetching } = useQuery({
        queryKey: ["Feed" + ref.current],
        queryFn: () => controller.getAppData(),
    });

    useFocusEffect(
        useCallback(() => {
            ref.current += 1;
            console.log(ref.current);
        }, [])
    );

    return (
        <FlatList
            refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
            ListHeaderComponent={() => <Header />}
            style={styles.page}
            contentContainerStyle={styles.list}
            data={data?.sort((a, b) => (a.publishDate.getTime() > b.publishDate.getTime() ? -1 : 1))}
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
