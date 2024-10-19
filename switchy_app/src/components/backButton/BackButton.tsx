import { TouchableOpacity, View, Text } from "react-native";
import styles from "./backButtonStyles";
import React from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import appColors from "../../styles/appColors";

type CommentsProps = {
    goBack: () => void;
};

export default function BackButton({ goBack }: CommentsProps) {
    return (
        <TouchableOpacity style={styles.button} onPress={goBack} activeOpacity={0.8}>
            <FontAwesome5 name="chevron-left" size={24} color={appColors.accent200} />
            <Text style={styles.headerText}>Voltar</Text>
        </TouchableOpacity>
    );
}
