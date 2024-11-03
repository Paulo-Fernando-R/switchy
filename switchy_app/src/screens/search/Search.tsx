import React from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import styles from "./searchStyles";
import { TextInput } from "react-native-gesture-handler";
import Feather from "@expo/vector-icons/Feather";
import appColors from "../../styles/appColors";
import SearchController from "./searchController";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import User from "../../models/user";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SearchNavigationProp } from "../../routes/types/navigationTypes";

type SearchProps = {
    navigation: SearchNavigationProp;
};

type HeaderProps = {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    mutation: UseMutationResult<User[] | undefined, Error, void, unknown>;
};

type ListItemProps = {
    user: Partial<User>;
    navigate: (id: string) => void;
};

export default function Search({ navigation }: SearchProps) {
    const controller = new SearchController();
    const [searchQuery, setSearchQuery] = React.useState("");

    function navigate(id: string) {
        navigation.navigate("SearchProfile", { userId: id });
    }

    const mutation = useMutation({
        mutationFn: () => controller.searchUser(searchQuery),
    });
    return (
        <View style={styles.page}>
            <Header mutation={mutation} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <FlatList
                style={styles.page}
                contentContainerStyle={styles.list}
                data={mutation.data}
                ListEmptyComponent={!mutation.data ? Empty : NotFound}
                renderItem={({ item }) => <ListItem user={item} navigate={navigate} />}
            />
        </View>
    );
}

function Header({ searchQuery, setSearchQuery, mutation }: HeaderProps) {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>Pesquisar</Text>
            <View style={styles.inputBox}>
                <TextInput
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                    placeholder="Pesquisar"
                    placeholderTextColor={appColors.text300}
                    style={styles.input}
                />
                <TouchableOpacity activeOpacity={0.5} onPress={() => mutation.mutate()}>
                    <Feather name="search" size={20} color={appColors.text300} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

function ListItem({ navigate, user }: ListItemProps) {
    return (
        <TouchableOpacity activeOpacity={0.8} style={styles.listItem} onPress={() => navigate(user.id!)}>
            <View style={styles.avatarBox}>
                <Feather name="user" size={28} color={appColors.text200} />
            </View>
            <View style={styles.textBox}>
                <Text numberOfLines={1} style={styles.name}>
                    {user.name}
                </Text>
                <Text numberOfLines={1} style={styles.userName}>
                    @{user.userName}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

function Empty() {
    return (
        <View style={styles.emptyList}>
            <MaterialCommunityIcons name="account-search-outline" size={64} color={appColors.text400} />
            <Text style={styles.emptyText}>Pesquise pelo nome de usuário ou e-mail</Text>
        </View>
    );
}

function NotFound() {
    return (
        <View style={styles.emptyList}>
            <Ionicons name="warning-outline" size={64} color={appColors.text400} />
            <Text style={styles.emptyText}>Usuário não encontrado</Text>
        </View>
    );
}
