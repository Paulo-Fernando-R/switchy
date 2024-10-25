import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "./buttonDefaultStyles";
import appColors from "../../styles/appColors";

type ButtonDefaultProps = {
    text: string;
    textColor: string;
    backgroundColor: string;
};

export default function ButtonDefault({ text, textColor, backgroundColor }: ButtonDefaultProps) {
    return (
        <TouchableOpacity activeOpacity={0.8} style={[styles.button, { backgroundColor: backgroundColor }]}>
            <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
        </TouchableOpacity>
    );
}
