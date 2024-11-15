import { StyleSheet } from "react-native";
import appColors from "../../styles/appColors";
import appTexts from "../../styles/appTexts";

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: appColors.bg100,
        // paddingHorizontal: 20,
        paddingVertical: 44,
        justifyContent: "flex-start",
    },
    header: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    headerTitle: {
        paddingHorizontal: 20,
        gap: 20,
        alignItems: "flex-start",
        justifyContent: "center",
    },
    body: {
        flex: 1,
        paddingHorizontal: 20,
        gap: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        ...appTexts.title1SemiBold,
        color: appColors.accent200,
        textAlign: "left",
    },
    title2: {
        ...appTexts.paragraph2Regular,
        color: appColors.text300,
        textAlign: "left",
    },
    inputBox: {
        flexDirection: "row",
        gap: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: appColors.bg300,
        width: "100%",
        borderRadius: 16,
        height: 48,
    },
    input: {
        flex: 1,
        ...appTexts.paragraph1Regular,
        color: appColors.text300,
    },
    button: {
        backgroundColor: appColors.accent300,
        borderRadius: 16,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 48,
    },
    buttonText: {
        ...appTexts.title2Medium,
        color: appColors.text100,
    },

    textButton: {
        alignItems: "center",
    },
    textButtonText: {
        ...appTexts.paragraph1Regular,
        color: appColors.accent300,
    },
});

export default styles;
