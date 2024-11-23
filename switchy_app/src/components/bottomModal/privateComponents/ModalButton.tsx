import React from "react";
import styles from "../bottomModalStyles";
import { TouchableOpacity, Text } from "react-native";

type ModalButtonProps = {
    action(): void;
    text: string;
    icon?: React.ReactNode;
};

export default function ModalButton({ action, text, icon }: ModalButtonProps) {
    return (
        <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={action}>
            <Text style={styles.text}>{text}</Text>
            {icon}
        </TouchableOpacity>
    );
}
