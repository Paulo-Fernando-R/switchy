import React, { useState } from "react";
import { Text, View } from "react-native";
import appColors from "../../styles/appColors";
import { RootTabsPublishNavigationProp } from "../../routes/types/navigationTypes";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import styles from "./notificationsStyles";
import NotificationsController from "./notificationsController";
import NotificationListItem from "./components/NotificationListItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useNotificationsListContext } from "../../contexts/notificationsListContext";

export default function Notifications({ navigation, route }: RootTabsPublishNavigationProp) {
    const controller = new NotificationsController();
    const { values, setValues } = useNotificationsListContext();

    const { isSuccess, data, isFetching, refetch, fetchNextPage } = useInfiniteQuery({
        queryKey: ['Notifications'],
        queryFn: ({ pageParam }) => controller.loadNotifications(pageParam),
        initialPageParam: 0,
        getNextPageParam: controller.handleNext,
    });

    useState(() => {
        isSuccess && setValues(data?.pages?.flat());
    });

    return (
        <View style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Atividade</Text>
            </View>

            <FlatList
                // style={styles.page}

                refreshControl={
                    <RefreshControl
                        refreshing={isFetching}
                        onRefresh={refetch}
                    />
                }
                data={values}
                ListEmptyComponent={<Empty />}
                onEndReached={() => fetchNextPage()}
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
