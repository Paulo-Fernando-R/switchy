import styles from "./questionPopupStyles";
import React from "react";
import { Modal, View, Text, Pressable, TouchableOpacity } from "react-native";
import appColors from "../../styles/appColors";

type QuestionPopupProps = {
    visibility: boolean;
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    description: string;
    action: () => void;
    actionText?: string;
};

export default function QuestionPopup({
    visibility,
    setVisibility,
    action,
    description,
    title,
    actionText,
}: QuestionPopupProps) {
    function close() {
        setVisibility(false);
    }
    return (
        <Modal
            animationType="fade"
            hardwareAccelerated={true}
            transparent={true}
            visible={visibility}
            onRequestClose={close}
        >
            <Pressable style={styles.centeredView} onPressIn={close}>
                <View style={styles.modalStyle}>
                    <View style={styles.title}>
                        <Text style={styles.title1}>{title}</Text>
                        <Text style={styles.title2}>{description}</Text>
                    </View>

                    <View style={styles.buttons}>
                        <TouchableOpacity activeOpacity={0.6} onPress={close}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.6} onPress={action}>
                            <Text style={[styles.button, { color: appColors.error }]}>
                                {actionText ? actionText : "Excluir"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Pressable>
        </Modal>
    );
}
