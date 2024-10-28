import { ProfileNavigationProp, ProfileRouteProp } from "../../routes/types/navigationTypes";
import { Text, View, Image, FlatList, TouchableOpacity } from "react-native";
import ButtonDefault from "../../components/buttonDefault/ButtonDefault";
import PostFeedItem from "../../components/postFeedItem/PostFeedItem";
import { useUserContext } from "../../contexts/userContext";
import useLayoutFocus from "../../hooks/useLayoutFocus";
//@ts-ignore
import logo from "../../../assets/images/logo.png";
import Feather from "@expo/vector-icons/Feather";
import { useQuery } from "@tanstack/react-query";
import appColors from "../../styles/appColors";
import UserController from "./userController";
import User from "../../models/user";
import styles from "./userStyles";
import React from "react";

type UserHeaderProps = {
    user: User;
};

type ProfileProps = {
    navigation: ProfileNavigationProp;
    route: ProfileRouteProp;
};

export default function Profile({ navigation, route }: ProfileProps) {
    const { user } = useUserContext();
    const controller = new UserController();

    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ["Profile"],
        queryFn: () => controller.getPosts(user?.id!),
    });
    useLayoutFocus(refetch);

    return (
        <View style={styles.page}>
            <Header user={user!} />
            <Text style={styles.subtitle}>Publicações</Text>

            {!isLoading ? (
                <FlatList
                    contentContainerStyle={styles.list}
                    data={data}
                    renderItem={({ item }) => <PostFeedItem item={item} error={error} />}
                />
            ) : (
                <FlatList
                    contentContainerStyle={styles.list}
                    data={controller.placeholderData}
                    renderItem={() => <PostFeedItem />}
                />
            )}
        </View>
    );
}

function Header({ user }: UserHeaderProps) {
    return (
        <View>
            <View style={styles.header}>
                <Image style={styles.logo} source={logo} />
                <Text style={styles.headerText}>Swithcy</Text>
            </View>

            <View style={styles.profileBox}>
                <View style={styles.nameBox}>
                    <Text style={styles.name}>{user.name}</Text>
                    <TouchableOpacity activeOpacity={0.5}>
                        <Feather name="edit-3" size={20} color={appColors.accent300} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.userName}>@{user.userName}</Text>
                <Text style={styles.bio}>
                    necessário adicionar ao tipo de usuario no back e front Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Donec sed felis id risus consequat tincidunt.
                </Text>
                <Text style={styles.follow}>100 Seguidores</Text>
                <View style={styles.buttons}>
                    <ButtonDefault
                        text="Editar perfil"
                        backgroundColor={appColors.accent200}
                        textColor={appColors.text400}
                        action={() => {}}
                    />

                    <ButtonDefault
                        text="Editar perfil"
                        backgroundColor={appColors.error}
                        textColor={appColors.text100}
                        action={() => {}}
                    />
                </View>
            </View>
        </View>
    );
}
