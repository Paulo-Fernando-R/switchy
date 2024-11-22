import React, { useEffect } from "react";
import styles from "../commentsStyles";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { ActivityIndicator, TextInput, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import appColors from "../../../styles/appColors";
import useKeyboard from "../../../hooks/useKeyboard";
import KeyboardStateEnum from "../../../enums/keyboardStateEnum";

type InputAreaProps = {
    placeholder: string;
    value: string;
    setValue: (value: React.SetStateAction<string>) => void;
    isLoading: boolean;
    action: () => void;
};
export default function InputArea({ action, isLoading, placeholder, setValue, value }: InputAreaProps) {
    const keyBoard = useKeyboard() === KeyboardStateEnum.show;
    const transLateY = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: withTiming(transLateY.value) }],
    }));

    useEffect(() => {
        transLateY.value = keyBoard ? -30 : 0;
    }, [keyBoard]);
    return (
        <Animated.View style={[styles.inputBox, animatedStyles]}>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={appColors.text300}
                multiline={true}
                style={styles.input}
                onChangeText={(text) => setValue(text)}
                value={value}
            />
            <TouchableOpacity disabled={isLoading} activeOpacity={0.8} onPress={action}>
                {isLoading ? (
                    <ActivityIndicator size="small" color={appColors.accent300} />
                ) : (
                    <MaterialCommunityIcons name="send-outline" size={20} color={appColors.accent300} />
                )}
            </TouchableOpacity>
        </Animated.View>
    );
}
