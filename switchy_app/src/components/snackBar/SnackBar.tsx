import React, { useState } from "react";
import styles from "./snackBarStyles";
import { Text, TouchableOpacity } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import AntDesign from "@expo/vector-icons/AntDesign";
import appColors from "../../styles/appColors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type SnackBarProps = {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    message: string;
    autoDismissible?: boolean;
    autoDismissTime?: number;
    
};

const SnackBar = {
    Sucess,
    Error,
};

export default SnackBar;

function Sucess({ visible, setVisible, autoDismissible, autoDismissTime, message }: SnackBarProps) {
    async function close() {
        setVisible(false);
    }

    async function autoDismiss() {
        await new Promise((resolve) => {
            setTimeout(
                () => {
                    resolve(setVisible(false));
                },
                autoDismissTime ? autoDismissTime : 5000
            );
        });
    }

    if (autoDismissible) {
        autoDismiss();
    }

    return (
        visible && (
            <Animated.View entering={FadeInUp} exiting={FadeOutUp} style={styles.containerSucess}>
                <FontAwesome5 name="check-circle" size={20} color={appColors.text100} />
                <Text numberOfLines={1} style={styles.text}>
                   {message}
                </Text>
                <TouchableOpacity activeOpacity={0.7} onPress={close}>
                    <AntDesign name="close" size={20} color={appColors.text100} />
                </TouchableOpacity>
            </Animated.View>
        )
    );
}

function Error({ visible, setVisible, autoDismissible, autoDismissTime , message}: SnackBarProps) {
    async function close() {
        setVisible(false);
    }

    async function autoDismiss() {
        await new Promise((resolve) => {
            setTimeout(
                () => {
                    resolve(setVisible(false));
                },
                autoDismissTime ? autoDismissTime : 5000
            );
        });
    }

    if (autoDismissible) {
        autoDismiss();
    }

    return (
        visible && (
            <Animated.View entering={FadeInUp} exiting={FadeOutUp} style={styles.containerError}>
                <MaterialIcons name="error-outline" size={20} color={appColors.text100} />
                <Text numberOfLines={1} style={styles.text}>
                  {message}
                </Text>
                <TouchableOpacity activeOpacity={0.7} onPress={close}>
                    <AntDesign name="close" size={20} color={appColors.text100} />
                </TouchableOpacity>
            </Animated.View>
        )
    );
}
