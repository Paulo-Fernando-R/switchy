import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./commentsStyles";
import { HomeNavigationProp } from "../../routes/types/navigationTypes";
import { CommentsRouteProp } from "../../routes/types/navigationTypes";
import React from "react";
import BackButton from "../../components/backButton/BackButton";
import PostFeedItem from "../../components/postFeedItem/PostFeedItem";
import { FlatList } from "react-native-gesture-handler";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import appColors from "../../styles/appColors";

type CommentsProps = {
    route: CommentsRouteProp;
    navigation: HomeNavigationProp;
};

export default function Comments({ route, navigation }: CommentsProps) {
    const { post } = route.params;
    function goBack() {
        navigation.navigate("Home");
    }

    return (
        <View style={styles.page}>
            <View style={styles.header}>
                <BackButton goBack={goBack} />
            </View>
            <View style={styles.mainPost}>
                <PostFeedItem item={post} />
            </View>
            <Text style={styles.title}>Respostas</Text>

            <FlatList
                contentContainerStyle={styles.list}
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                renderItem={({ item }) => <PostFeedItem item={post} navigation={navigation} />}
            />
            <View style={styles.inputBox}>
                <TextInput
                    placeholder="Responder"
                    placeholderTextColor={appColors.text300}
                    multiline={true}
                    style={styles.input}
                />
                <TouchableOpacity activeOpacity={0.8}>
                    <MaterialCommunityIcons name="send-outline" size={20} color={appColors.accent300} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
