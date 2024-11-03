import { SearchNavigationProp, SearchProfileRouteProp } from "../../routes/types/navigationTypes";
import ButtonDefault from "../../components/buttonDefault/ButtonDefault";
import PostFeedItem from "../../components/postFeedItem/PostFeedItem";
import BackButton from "../../components/backButton/BackButton";
import SearchProfileController from "./searchProfileController";
import useLayoutFocus from "../../hooks/useLayoutFocus";
import { View, Text, FlatList } from "react-native";
import { useQuery } from "@tanstack/react-query";
import appColors from "../../styles/appColors";
import styles from "./searchProfileStyles";
import React from "react";

type SearchProfileProps = {
    navigation: SearchNavigationProp;
    route: SearchProfileRouteProp;
};

export default function SearchProfile({ navigation, route }: SearchProfileProps) {
    const { userId } = route.params;
    const controller = new SearchProfileController();
    const ref = useLayoutFocus();
    function goBack() {
        navigation.goBack();
    }

    const { data, error, refetch, isLoading } = useQuery({
        queryKey: ["SearchProfile" + userId + ref],
        queryFn: () => controller.getScreenData(userId),
        placeholderData: controller.placeholderData,
    });

    return (
        <View style={styles.page}>
            <View style={styles.header}>
                <BackButton goBack={goBack} />
            </View>

            <View style={styles.userInfo}>
                <Text numberOfLines={1} style={styles.name}>
                    {data?.userData.name}
                </Text>
                <Text numberOfLines={1} style={styles.userName}>
                    @{data?.userData.userName}
                </Text>
                <Text style={styles.bio}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed felis id risus consequat
                    tincidunt.
                </Text>

                <Text style={styles.follow}>{data?.userData.followers?.length} Seguidores</Text>
                <ButtonDefault text="Seguir" backgroundColor={appColors.accent200} textColor={appColors.text400} />
            </View>

            <Text style={styles.subtitle}>Publicações</Text>

            <FlatList
                contentContainerStyle={styles.list}
                data={data?.posts}
                renderItem={({ item }) => <PostFeedItem item={item} navigation={navigation} error={error} />}
            />
        </View>
    );
}
