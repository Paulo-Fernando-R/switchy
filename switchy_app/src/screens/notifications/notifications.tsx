import React from "react";
import { Text, View } from "react-native";
import appColors from "../../styles/appColors";
import { RootTabsPublishNavigationProp } from "../../routes/types/navigationTypes";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import styles from "./notificationsStyles";
import NotificationsController from "./notificationsController";
import NotificationListItem from "./components/NotificationListItem";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";

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

    const { mutate } = useMutation({
        mutationKey: ["NotificationsRead"],
        mutationFn: (ids: string[]) => controller.markAsRead(ids),
    });

    const action = (ids: string[]) => {
        mutate(ids);
        refetch();
    };

    console.log(data?.pages.flat().length);

    const a = [
        {
            content: { text: "isso é um post" },
            createdAt: new Date("2025-04-05T20:28:16.825Z"),
            id: "67f1adb89f0d5b802fcfc3b2",
            read: false,
            receiver: { id: "67f19d406c8adffc2afa07a4", name: "nicotine", userName: "nicotine" },
            sender: {
                id: "67f19a189f0d5b802fcfc2c8",
                name: "Matheus Ferreira",
                userName: "_TheuFerreira",
            },
            type: 1,
        },
        {
            content: { text: "isso é um post" },
            createdAt: new Date("2025-04-05T20:28:16.825Z"),
            id: "67f1adb89f0d5b802fcfc3b2",
            read: false,
            receiver: { id: "67f19d406c8adffc2afa07a4", name: "nicotine", userName: "nicotine" },
            sender: {
                id: "67f19a189f0d5b802fcfc2c8",
                name: "Matheus Ferreira",
                userName: "_TheuFerreira",
            },
            type: 3,
        },
        {
            content: { text: "isso é um post" },
            createdAt: new Date("2025-04-05T20:28:16.825Z"),
            id: "67f1adb89f0d5b802fcfc3b2",
            read: false,
            receiver: { id: "67f19d406c8adffc2afa07a4", name: "nicotine", userName: "nicotine" },
            sender: {
                id: "67f19a189f0d5b802fcfc2c8",
                name: "Matheus Ferreira",
                userName: "_TheuFerreira",
            },
            type: 2,
        },
    ];

    return (
        <View style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Atividade</Text>
            </View>

            <FlatList
                refreshControl={<RefreshControl refreshing={false} onRefresh={refetch} />}
                data={a}
                //data={data?.pages.flat()}
                ListEmptyComponent={<Empty />}
                renderItem={({ item }) => (
                    <NotificationListItem notification={item} onNotificationClick={action} />
                )}
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
