import { TouchableOpacity, View, Text } from "react-native";
import styles from "./buttonLargeStyles";

import React from "react";

type ButtonLargeProps = {
    title: string;
    action: () => void;
    backColor: string;
    textColor: string;
};

export default function ButtonLarge({ action, backColor, textColor, title }: ButtonLargeProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={action}
            style={[styles.largeButton, { backgroundColor: backColor }]}
        >
            <Text style={[styles.text, { color: textColor }]}>{title}</Text>
        </TouchableOpacity>
    );
}
