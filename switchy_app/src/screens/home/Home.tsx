import PostFeedItem from "../../components/postFeedItem/PostFeedItem";
import { Text, View, Image, FlatList } from "react-native";
//@ts-ignore
import logo from "../../../assets/images/logo.png";
import styles from "./homeStyles";
import React from "react";

export default function Home() {
    return (
        <FlatList
            ListHeaderComponent={() => <Header />}
            style={styles.page}
            contentContainerStyle={styles.list}
            data={[1, 2, 3, 4, 4, 5]}
            renderItem={() => <PostFeedItem />}
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
