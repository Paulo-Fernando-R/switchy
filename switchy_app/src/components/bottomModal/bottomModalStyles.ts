import { StyleSheet } from "react-native";
import appColors from "../../styles/appColors";
import appTexts from "../../styles/appTexts";

const styles = StyleSheet.create({
    modalStyle: {
        backgroundColor: appColors.bg100,
        elevation: 4,
        overflow: "hidden",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    childrenStyle: {
        backgroundColor: appColors.bg100,
        paddingHorizontal: 20,
        paddingVertical: 20,
        paddingTop: 40,
        minHeight: 150,
    },
    handleStyle: {
        backgroundColor: appColors.accent100,
        color: appColors.accent100,
        width: 60,
        marginTop: 8,
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
        color: appColors.text100,
    },
});

export default styles;
