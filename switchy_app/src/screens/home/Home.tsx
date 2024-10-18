import PostFeedItem from "../../components/postFeedItem/PostFeedItem";
import { Text, View, Image, FlatList } from "react-native";
//@ts-ignore
import logo from "../../../assets/images/logo.png";
import styles from "./homeStyles";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import HomeController from "./homeController";

export default function Home() {
    const controller = new HomeController();

    const { data, error } = useQuery({
        queryKey: ["Feeds"],
        queryFn: () => controller.getFeedData(),
    });

    console.log(data, error);
    return (
        <FlatList
            ListHeaderComponent={() => <Header />}
            style={styles.page}
            contentContainerStyle={styles.list}
            data={data}
            renderItem={({ item, index }) => <PostFeedItem item={item} />}
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
