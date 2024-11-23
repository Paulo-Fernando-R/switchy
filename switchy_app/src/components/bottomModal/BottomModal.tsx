import styles from "./bottomModalStyles";
import { Modalize } from "react-native-modalize";
import React from "react";
import { IHandles } from "react-native-modalize/lib/options";
import { Portal } from "react-native-portalize";

type BottomModalProps = {
    modalizeRef: React.RefObject<IHandles>;
    children: React.ReactNode[] | React.ReactNode;
};

export default function BottomModal({ modalizeRef, children }: BottomModalProps) {
    return (
        <>
            {/* {popup} */}
            <Portal>
                <Modalize
                    closeSnapPointStraightEnabled={true}
                    ref={modalizeRef}
                    withHandle={true}
                    adjustToContentHeight={true}
                    //modalHeight={300}
                    velocity={20}
                    handlePosition="inside"
                    childrenStyle={styles.childrenStyle}
                    handleStyle={styles.handleStyle}
                    modalStyle={styles.modalStyle}
                    scrollViewProps={{ contentContainerStyle: { gap: 12 } }}
                >
                    {children instanceof Array ? children.map((child, index) => child) : children}
                </Modalize>
            </Portal>
        </>
    );
}
