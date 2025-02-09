import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import appColors from "../../styles/appColors";
import useKeyboard from "../../hooks/useKeyboard";
import { useUserContext } from "../../contexts/userContext";
import { RootTabsPublishNavigationProp } from "../../routes/types/navigationTypes";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import styles from "./notificationsStyles";
import NotificationsController from "./notificationsController";
import Feather from "@expo/vector-icons/Feather";

export default function Notifications({ navigation, route }: RootTabsPublishNavigationProp) {
    const controller = new NotificationsController();
    const [text, setText] = useState("");
    const keyBoard = useKeyboard();
    const { user } = useUserContext();
    const [snackBarError, setSnackBarError] = useState(false);
    const [snackBarSucess, setSnackBarSucess] = useState(false);

    function navigate() {
        navigation.navigate("HomeStack", { screen: "Home" });
    }

    useState(() => {
        controller.load();
    });

    return (
        <View style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Notificações</Text>
            </View>

            <FlatList
                style={styles.page}
                refreshControl={<RefreshControl refreshing={false} onRefresh={() => {controller.load();}} />}
                data={[]}
                ListEmptyComponent={<Empty/>}
                renderItem={({item}) => <ListItem item={item}/>}
            />
        </View>
    );
}

function Empty() {
    return (
        <View style={styles.emptyList}>
            <MaterialCommunityIcons name="account-search-outline" size={64} color={appColors.text400} />
            <Text style={styles.emptyText}>Nenhuma notificação encontrada</Text>
        </View>
    );
}

function ListItem({item}: any) {
    return (
        <TouchableOpacity activeOpacity={0.8} /*style={styles.listItem} onPress={() => navigate(user.id!)}*/>
            <View /*style={styles.avatarBox}*/>
                <Feather name="user" size={28} color={appColors.text200} />
            </View>
            <View /*style={styles.textBox}*/>
                <Text numberOfLines={1} /*style={styles.name}*/>
                    user.name
                </Text>
                <Text numberOfLines={1} /*style={styles.userName}*/>
                    user.userName
                </Text>
            </View>
        </TouchableOpacity>
    );
}