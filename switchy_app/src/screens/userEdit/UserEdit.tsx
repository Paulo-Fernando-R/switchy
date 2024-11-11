import { View, ScrollView } from "react-native";
import styles from "./userEditStyles";
import React from "react";
import BackButton from "../../components/backButton/BackButton";
import PersonalInfo from "./privateComponents/PersonalInfo";
import Password from "./privateComponents/Password";
import { ProfileNavigationProp } from "../../routes/types/navigationTypes";
import Username from "./privateComponents/Username";

type UserEditProps = {
    navigation: ProfileNavigationProp;
};

export default function UserEdit({ navigation }: UserEditProps) {
    function goBack() {
        navigation.goBack();
    }
    return (
        <View style={styles.page}>
            <View style={styles.header}>
                <BackButton goBack={goBack} />
            </View>
            <ScrollView contentContainerStyle={styles.list}>
                <View style={styles.body}>
                    <Username />
                    <PersonalInfo />
                    <Password />
                </View>
            </ScrollView>
        </View>
    );
}
