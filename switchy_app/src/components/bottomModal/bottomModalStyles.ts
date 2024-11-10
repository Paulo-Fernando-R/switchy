import { StyleSheet } from "react-native";
import appColors from "../../styles/appColors";
import appTexts from "../../styles/appTexts";

const styles = StyleSheet.create({
    modalStyle: {
        backgroundColor: appColors.bg200,
        elevation: 4,
        overflow: "hidden",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    childrenStyle: {
        backgroundColor: appColors.bg200,
        paddingHorizontal: 20,
        paddingVertical: 20,
        paddingTop: 40,
    },
    handleStyle: {
        backgroundColor: appColors.bg300,
        color: appColors.bg300,
        width: 60,
        marginTop: 10,
    },
    button: {
        backgroundColor: appColors.bg300,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 16,
        elevation: 1,
    },
    text: {
        ...appTexts.paragraph1Regular,
        color: appColors.error,
    },
});

export default styles;
