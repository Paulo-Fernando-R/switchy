import React from "react";
import appColors from "../../../styles/appColors";
import Feather from "@expo/vector-icons/Feather";
import { IHandles } from "react-native-modalize/lib/options";

type MoreActionsButtonProps = {
    modalizeRef: React.RefObject<IHandles>;
};

export default function MoreActionsButton({ modalizeRef }: MoreActionsButtonProps) {
    const onOpen = () => {
        modalizeRef.current?.open();
    };
    return <Feather name="more-horizontal" size={20} color={appColors.text200} onPress={onOpen} />;
}
