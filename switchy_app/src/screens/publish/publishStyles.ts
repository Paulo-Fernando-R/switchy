import { StyleSheet } from "react-native";
import appColors from "../../styles/appColors";
import appTexts from "../../styles/appTexts";

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: appColors.bg100,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        paddingBottom: 30,
        paddingHorizontal: 20,
        paddingTop: 12,
    },

    titleBox: {
        flexDirection: "row",
        gap: 4,
        alignItems: "center",
        paddingHorizontal: 20,
    },
    name: {
        ...appTexts.paragraph2Regular,
        color: appColors.text100,
    },
    userName: {
        ...appTexts.paragraph3Regular,
        color: appColors.text300,
    },
    body: {
        flex: 1,
    },
    bodyContent: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        //  alignItems: 'flex-end',
        gap: 24,
    },
    input: {
        ...appTexts.paragraph1Regular,
        color: appColors.text300,
        width: "100%",
    },
    bottomClose: {
        ...appTexts.paragraph2Regular,
        color: appColors.text200,
        paddingHorizontal: 20,
    },
});

export default styles;
