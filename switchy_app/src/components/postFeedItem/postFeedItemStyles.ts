import { StyleSheet } from "react-native";
import appColors from "../../styles/appColors";
import appTexts from "../../styles/appTexts";

const styles = StyleSheet.create({
    listItem: {
        flexDirection: "row",
        paddingVertical: 12,
        borderBottomColor: appColors.stroke100,
        borderBottomWidth: 1,
        gap: 12,
    },
    itemAvatar: {
        width: 40,
        height: 40,
        borderRadius: 100,
        backgroundColor: appColors.bg300,
        justifyContent: "center",
        alignItems: "center",
    },
    avatarIcon: {
        width: 24,
        height: 24
    },
    itemContent: {
        gap: 10,
    },
    itemTitle: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    titleName: {
        ...appTexts.paragraph2Regular,
    },
    titleUname: {
        ...appTexts.paragraph3Regular,
        color: appColors.text300,
    },
    itemContentBody: {
        ...appTexts.paragraph3Regular,
        color: appColors.text200,
        maxWidth: "95%",
    },
    itemContentActions: {
        flexDirection: "row",
        gap: 16,
        alignItems: "center",
    },
    contentActionButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    contentActionText: {
        ...appTexts.paragraph3Regular,
    },
});

export default styles;