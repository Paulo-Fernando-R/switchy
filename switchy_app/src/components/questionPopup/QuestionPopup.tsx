import styles from "./questionPopupStyles";
import React from "react";
import { Modal, View, Text, TouchableHighlight, Pressable, TouchableOpacity } from "react-native";
import appColors from "../../styles/appColors";

type QuestionPopupProps = {
    visibility: boolean;
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function QuestionPopup({ visibility, setVisibility }: QuestionPopupProps) {
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
                        <Text style={styles.title1}>Deseja excluir a publicação?</Text>
                        <Text style={styles.title2}>Esta ação não pode ser desfeita</Text>
                    </View>

                    <View  style={styles.buttons}>
                        <TouchableOpacity activeOpacity={0.6} onPress={close}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.6} onPress={() => {}}>
                            <Text style={[styles.button, { color: appColors.error }]}>Excluir</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Pressable>
        </Modal>
    );
}

/*

 <Modalize
                closeSnapPointStraightEnabled={true}
                ref={popupRef}
                withHandle={false}
                childrenStyle={styles.childrenStyle}
                modalStyle={styles.modalStyle}
            >
                <TouchableOpacity activeOpacity={0.8} style={styles.button}></TouchableOpacity>
            </Modalize>
*/
