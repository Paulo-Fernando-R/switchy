import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "./buttonDefaultStyles";
import appColors from "../../styles/appColors";

type ButtonDefaultProps = {
    text: string;
    textColor: string;
    backgroundColor: string;
    action: () => void;
    disabled?: boolean;
    filled?: boolean;
};

export default function ButtonDefault({
    text,
    textColor,
    backgroundColor,
    action,
    disabled,
    filled,
}: ButtonDefaultProps) {
    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={action}
            activeOpacity={0.8}
            style={[
                styles.button,
                { borderColor: backgroundColor },
                { backgroundColor: filled ? backgroundColor : "transparent" },
            ]}
        >
            <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
        </TouchableOpacity>
    );
}
