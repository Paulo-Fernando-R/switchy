import React from "react";
import { Text, View, FlatList } from "react-native";
import styles from "./searchStyles";
import { TextInput } from "react-native-gesture-handler";
import Feather from "@expo/vector-icons/Feather";
import appColors from "../../styles/appColors";

export default function Search() {
    return (
        <FlatList
            style={styles.page}
            contentContainerStyle={styles.list}
            data={[1, 2, 3, 4,5,6,7,8,9,12,12,12]}
            ListHeaderComponent={Header}
            renderItem={() => <ListItem />}
        />
    );
}

function Header() {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>Pesquisar</Text>
            <View style={styles.inputBox}>
                <TextInput placeholder="Pesquisar" placeholderTextColor={appColors.text300} style={styles.input} />
                <Feather name="search" size={20} color={appColors.text300} />
            </View>
        </View>
    );
}

function ListItem() {
    return (
        <View style={styles.listItem}>
            <View style={styles.avatarBox}>
                <Feather name="user" size={28} color={appColors.text200} />
            </View>
            <View style={styles.textBox}>
                <Text numberOfLines={1} style={styles.name}>
                    Nome do Usuário
                </Text>
                <Text numberOfLines={1} style={styles.userName}>
                    @dousuario
                </Text>
            </View>
        </View>
    );
}
