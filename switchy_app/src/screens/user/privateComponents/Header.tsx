import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import styles from "../userStyles";
import Feather from "@expo/vector-icons/Feather";
import User from "../../../models/user";
//@ts-ignore
import logo from "../../../../assets/images/logo.png";
import appColors from "../../../styles/appColors";

type ProfileHeaderProps = {
    user: User | null;
    navigate: () => void;
};

export default function Header({ user, navigate }: ProfileHeaderProps) {
    return (
        <View>
            <View style={styles.header}>
                <Image style={styles.logo} source={logo} />
                <Text style={styles.headerText}>Switchy</Text>
            </View>

            <View style={styles.profileBox}>
                <View style={styles.nameBox}>
                    <Text style={styles.name}>{user?.name}</Text>
                    <TouchableOpacity activeOpacity={0.5} onPress={navigate}>
                        <Feather name="edit-3" size={20} color={appColors.text300} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.userName}>@{user?.userName}</Text>
                <Text style={styles.bio}>{user?.description}</Text>

                <View style={styles.buttons}>
                    <Text style={styles.follow}>{user?.followers?.length} Seguidores</Text>
                    <Text style={styles.follow}>{user?.following?.length} Seguindo</Text>
                </View>
            </View>
            <Text style={styles.subtitle}>Publicações</Text>
        </View>
    );
}
