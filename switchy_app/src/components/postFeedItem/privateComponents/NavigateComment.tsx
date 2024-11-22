import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "../postFeedItemStyles";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import appColors from "../../../styles/appColors";

type NavigateCommentProps = {
    navigate: () => void;
    commentsNumber: number | undefined;
};
export default function NavigateComment({ commentsNumber, navigate }: NavigateCommentProps) {
    return (
        <TouchableOpacity style={styles.contentActionButton} onPress={navigate}>
            <FontAwesome name="comment-o" size={20} color={appColors.text100} />
            <Text style={styles.contentActionText}>{commentsNumber}</Text>
        </TouchableOpacity>
    );
}
