import React from "react";
import { Text, View } from "react-native";
import appColors from "../../styles/appColors";
import { RootTabsPublishNavigationProp } from "../../routes/types/navigationTypes";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import styles from "./notificationsStyles";
import NotificationsController from "./notificationsController";
import NotificationListItem from "./components/NotificationListItem";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function Notifications({ navigation, route }: RootTabsPublishNavigationProp) {
    const controller = new NotificationsController();

    function navigate() {
        navigation.navigate("HomeStack", { screen: "Home" });
    }

    const { data, refetch } = useInfiniteQuery({
        queryKey: ["Notifications"],
        queryFn: ({ pageParam }) => controller.getNotifications(pageParam),
        initialPageParam: 1,
        getNextPageParam: controller.handleNext,
        placeholderData: () => ({ pageParams: [1], pages: [controller.placeholderData] }),
    });

    return (
        <View style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Atividade</Text>
            </View>

            <FlatList
                refreshControl={<RefreshControl refreshing={false} onRefresh={refetch} />}
                data={data?.pages.flat()}
                ListEmptyComponent={<Empty />}
                renderItem={({ item }) => <NotificationListItem notification={item} />}
            />
        </View>
    );
}

function Empty() {
    return (
        <View style={styles.emptyList}>
            <MaterialCommunityIcons
                name="account-search-outline"
                size={64}
                color={appColors.text400}
            />
            <Text style={styles.emptyText}>Nenhuma notificação encontrada</Text>
        </View>
    );
}
