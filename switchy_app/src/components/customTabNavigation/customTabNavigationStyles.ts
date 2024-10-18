import { StyleSheet } from "react-native";
import appTexts from "../../styles/appTexts";
import appColors from "../../styles/appColors";

const styles = StyleSheet.create({
    tabBarBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 40,
        paddingVertical: 10,
        height: 60,
        backgroundColor: appColors.bg200,
        borderRadius: 100,
        position: "absolute",
        bottom: 20,
        width: "80%",
        alignSelf: "center",
        elevation: 1,
    },

    image: {
        width: 28,
        height: 28,
    },

    tabBarButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    tabActive: {
        backgroundColor: appColors.bg300,
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    tabBarTextAcive: {
        ...appTexts.paragraph1Regular,
        color: appColors.primary100,
    },
});
export default styles;
