import { ProfileNavigationProp, ProfileRouteProp } from "../../routes/types/navigationTypes";
import { Text, View, Image, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import PostFeedItem from "../../components/postFeedItem/PostFeedItem";
import { useUserContext } from "../../contexts/userContext";
import EmptyList from "../../components/emptyList/EmpyList";
import { useInfiniteQuery } from "@tanstack/react-query";
import useLayoutFocus from "../../hooks/useLayoutFocus";
//@ts-ignore
import logo from "../../../assets/images/logo.png";
import Feather from "@expo/vector-icons/Feather";
import appColors from "../../styles/appColors";
import UserController from "./userController";
import User from "../../models/user";
import styles from "./userStyles";
import React, { useEffect } from "react";
import { usePostsListContext } from "../../contexts/postsListContext";

type UserHeaderProps = {
    user: User | null;
    navigate: () => void;
};

type ProfileProps = {
    navigation: ProfileNavigationProp;
    route: ProfileRouteProp;
};

export default function Profile({ navigation, route }: ProfileProps) {
    const controller = new UserController();
    //const ref = useLayoutFocus();
    const { user } = useUserContext();
    const { posts, setPosts } = usePostsListContext();

    const { data, isSuccess, error, fetchNextPage, isFetchingNextPage, isRefetching, refetch } = useInfiniteQuery({
        queryKey: ["Profile"],
        queryFn: ({ pageParam }) => controller.getPosts(user?.id!, pageParam),
        placeholderData: () => ({ pageParams: [1], pages: [controller.placeholderData] }),
        getNextPageParam: controller.handleNext,
        initialPageParam: 1,
    });

    function navigate() {
        navigation.navigate("ProfileEdit");
    }

    useEffect(() => {
        isSuccess && setPosts(data?.pages?.flat());
    }, [data]);

    return (
        <View style={styles.page}>
            <Header user={user!} navigate={navigate} />
            <Text style={styles.subtitle}>Publicações</Text>

            <FlatList
                ListEmptyComponent={EmptyList}
                refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
                contentContainerStyle={styles.list}
                data={posts}
                renderItem={({ item }) => (
                    <PostFeedItem item={item} error={error} navigation={navigation} actionable={true} />
                )}
                onEndReachedThreshold={0.8}
                onEndReached={() => fetchNextPage()}
                ListFooterComponent={isFetchingNextPage ? <Footer /> : null}
                keyExtractor={(item, index) =>
                    `${item?.id}-${index}${item?.comments}${item?.likes}${item?.likedByUser}`
                }
            />
        </View>
    );
}

function Header({ user, navigate }: UserHeaderProps) {
    return (
        <View>
            <View style={styles.header}>
                <Image style={styles.logo} source={logo} />
                <Text style={styles.headerText}>Swithcy</Text>
            </View>

            <View style={styles.profileBox}>
                <View style={styles.nameBox}>
                    <Text style={styles.name}>{user?.name}</Text>
                    <TouchableOpacity activeOpacity={0.5} onPress={navigate}>
                        <Feather name="edit-3" size={20} color={appColors.text300} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.userName}>@{user?.userName}</Text>
                <Text style={styles.bio}>
                    necessário adicionar ao tipo de usuario no back e front Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Donec sed felis id risus consequat tincidunt.
                </Text>

                <View style={styles.buttons}>
                    <Text style={styles.follow}>{user?.followers?.length} Seguidores</Text>
                    <Text style={styles.follow}>{user?.following?.length} Seguindo</Text>
                </View>
            </View>
        </View>
    );
}

function Footer() {
    return <ActivityIndicator size="large" color={appColors.accent300} />;
}
