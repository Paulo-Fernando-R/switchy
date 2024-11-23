import React from "react";
import appColors from "../../../styles/appColors";
import Feather from "@expo/vector-icons/Feather";
import { IHandles } from "react-native-modalize/lib/options";

type MoreActionsButtonProps = {
    openModal: () => void;
};

export default function MoreActionsButton({ openModal }: MoreActionsButtonProps) {

    return <Feather name="more-horizontal" size={20} color={appColors.text200} onPress={openModal} />;
}
