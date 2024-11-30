import { SearchNavigationProp, SearchProfileRouteProp } from "../../routes/types/navigationTypes";
import ButtonDefault from "../../components/buttonDefault/ButtonDefault";
import PostFeedItem from "../../components/postFeedItem/PostFeedItem";
import BackButton from "../../components/backButton/BackButton";
import SearchProfileController from "./searchProfileController";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useUserContext } from "../../contexts/userContext";
import useLayoutFocus from "../../hooks/useLayoutFocus";
import { View, Text, FlatList } from "react-native";
import appColors from "../../styles/appColors";
import styles from "./searchProfileStyles";
import React, { useState } from "react";

type SearchProfileProps = {
    navigation: SearchNavigationProp;
    route: SearchProfileRouteProp;
};

export default function SearchProfile({ navigation, route }: SearchProfileProps) {
    const controller = new SearchProfileController();

    const { userId } = route.params;
    const { user, setUser } = useUserContext();

    const ref = useLayoutFocus();
    const [follow, setFollow] = useState(controller.isFollowing(userId, user));

    function goBack() {
        navigation.goBack();
    }

    const { data, error, refetch } = useQuery({
        queryKey: ["SearchProfile" + userId + ref],
        queryFn: () => controller.getScreenData(userId),
        placeholderData: controller.placeholderData,
    });

    const mutation = useMutation({
        mutationKey: ["Follow" + userId],
        mutationFn: () => controller.handleFollow(userId, setFollow, setUser, refetch, follow),
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
                <ButtonDefault
                    disabled={mutation.isPending}
                    text={follow ? "Seguindo" : "Seguir"}
                    backgroundColor={!follow ? appColors.accent300 : appColors.accent200}
                    textColor={appColors.accent200}
                    filled={!follow}
                    action={async () => mutation.mutate()}
                />
            </View>

            <Text style={styles.subtitle}>Publicações</Text>

            <FlatList
                contentContainerStyle={styles.list}
                data={data?.posts}
                renderItem={({ item }) => <PostFeedItem item={item}  error={error} />}
            />
        </View>
    );
}
