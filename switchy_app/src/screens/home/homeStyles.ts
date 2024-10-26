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
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        paddingBottom: 30,
    },
    logo: {
        width: 48,
        height: 48,
    },
    headerText: {
        ...appTexts.title2Medium,
        color: appColors.accent200,
    },

    list: {
        gap: 8,
        paddingTop: 12,
        paddingHorizontal: 20,
        paddingBottom: 80
    },
});

export default styles;
