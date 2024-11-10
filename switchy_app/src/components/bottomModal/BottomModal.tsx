import styles from "./bottomModalStyles";
import { Modalize } from "react-native-modalize";
import React, { useRef } from "react";
import { Text, TouchableOpacity } from "react-native";
import { IHandles } from "react-native-modalize/lib/options";
import { Portal } from "react-native-portalize";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import appColors from "../../styles/appColors";
import QuestionPopup from "../questionPopup/QuestionPopup";

type BottomModalProps = {
    modalizeRef: React.RefObject<IHandles>;
};

export default function BottomModal({ modalizeRef }: BottomModalProps) {
    const [popup, setPopup] = React.useState(false);
    function openPopup() {
        setPopup(true);
        modalizeRef.current?.close();
    }
    return (
        <>
            <QuestionPopup visibility={popup} setVisibility={setPopup} />
            <Portal>
                <Modalize
                    closeSnapPointStraightEnabled={true}
                    ref={modalizeRef}
                    withHandle={true}
                    adjustToContentHeight={true}
                    handlePosition="inside"
                    childrenStyle={styles.childrenStyle}
                    handleStyle={styles.handleStyle}
                    modalStyle={styles.modalStyle}
                >
                    <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={openPopup}>
                        <Text style={styles.text}>Excluir</Text>
                        <MaterialIcons name="delete-outline" size={24} color={appColors.error} />
                    </TouchableOpacity>
                </Modalize>
            </Portal>
        </>
    );
}
