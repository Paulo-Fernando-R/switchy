import React from "react";
import { View, Text, FlatList } from "react-native";
import styles from "./searchProfileStyles";
import BackButton from "../../components/backButton/BackButton";
import PostFeedItem from "../../components/postFeedItem/PostFeedItem";
import { RootTabsSearchNavigationProp, RootTabsSearchRouteProp } from "../../routes/types/navigationTypes";
import ButtonDefault from "../../components/buttonDefault/ButtonDefault";
import appColors from "../../styles/appColors";
type SearchProfileProps = {
    navigation: RootTabsSearchNavigationProp;
};

export default function SearchProfile({ navigation }: SearchProfileProps) {
    function goBack() {
        navigation.navigation.goBack();
    }
    return (
        <View style={styles.page}>
            <View style={styles.header}>
                <BackButton goBack={goBack} />
            </View>

            <View style={styles.userInfo}>
                <Text numberOfLines={1} style={styles.name}>
                    Matheus
                </Text>
                <Text numberOfLines={1} style={styles.userName}>
                    @matheus
                </Text>
                <Text style={styles.bio}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed felis id risus consequat
                    tincidunt.
                </Text>

                <Text style={styles.follow}>100 Seguidores</Text>
                <ButtonDefault text="Seguir" backgroundColor={appColors.accent200} textColor={appColors.text400} />
            </View>

            <Text style={styles.subtitle}>Publicações</Text>

            <FlatList contentContainerStyle={styles.list} data={[1, 2, 3, 4]} renderItem={() => <PostFeedItem />} />
        </View>
    );
}
