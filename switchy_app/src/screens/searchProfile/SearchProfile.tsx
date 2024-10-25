import { SearchNavigationProp, SearchProfileRouteProp } from "../../routes/types/navigationTypes";
import ButtonDefault from "../../components/buttonDefault/ButtonDefault";
import PostFeedItem from "../../components/postFeedItem/PostFeedItem";
import BackButton from "../../components/backButton/BackButton";
import SearchProfileController from "./searchProfileController";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, FlatList } from "react-native";
import React, { useCallback, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import appColors from "../../styles/appColors";
import styles from "./searchProfileStyles";

type SearchProfileProps = {
    navigation: SearchNavigationProp;
    route: SearchProfileRouteProp;
};

export default function SearchProfile({ navigation, route }: SearchProfileProps) {
    const { userId } = route.params;
    const controller = new SearchProfileController();
    const ref = useRef(0);
    function goBack() {
        navigation.goBack();
    }

    const { data, error } = useQuery({
        queryKey: ["SearchProfile" + ref.current],
        queryFn: () => controller.getPosts(userId),
    });

    useFocusEffect(
        useCallback(() => {
            ref.current += 1;
        }, [])
    );

    return (
        <View style={styles.page}>
            <View style={styles.header}>
                <BackButton goBack={goBack} />
            </View>

            <View style={styles.userInfo}>
                <Text numberOfLines={1} style={styles.name}>
                    Matheus
                </Text>
                <Text numberOfLines={1} style={styles.userName}>
                    @matheus
                </Text>
                <Text style={styles.bio}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed felis id risus consequat
                    tincidunt.
                </Text>

                <Text style={styles.follow}>100 Seguidores</Text>
                <ButtonDefault text="Seguir" backgroundColor={appColors.accent200} textColor={appColors.text400} />
            </View>

            <Text style={styles.subtitle}>Publicações</Text>

            <FlatList
                contentContainerStyle={styles.list}
                data={data}
                renderItem={({ item }) => <PostFeedItem item={item} navigation={navigation} error={error} />}
            />
        </View>
    );
}
