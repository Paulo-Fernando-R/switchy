import { StyleSheet } from "react-native";
import appColors from "../../styles/appColors";
import appTexts from "../../styles/appTexts";

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: appColors.bg100,
        paddingTop: 12,
        gap: 8,
        paddingBottom: 20,
    },

    header: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },

    userInfo: {
        paddingHorizontal: 20,
        paddingBottom: 16 ,
        gap: 8,
        borderBottomColor: appColors.stroke100,
        borderBottomWidth: 1,
    },
    name: {
        ...appTexts.title1SemiBold,
        color: appColors.text100,
    },
    userName: {
        ...appTexts.paragraph1Regular,
        color: appColors.text200,
    },
    bio: {
        ...appTexts.paragraph2Regular,
        color: appColors.text300,
    },
    follow: {
        ...appTexts.paragraph2Regular,
        color: appColors.text300,
    },

    subtitle: {
        ...appTexts.paragraph1Regular,
        color: appColors.text200,
        paddingHorizontal: 20,
    },

    list: {
        gap: 8,
        paddingTop: 12,
        paddingHorizontal: 20,
        paddingBottom: 80,
    },









    mainPost: {
        paddingHorizontal: 20,
    },
    title: {
        ...appTexts.paragraph2Regular,
        color: appColors.text300,
        paddingLeft: 20,
        paddingTop: 8,
    },

    inputBox: {
        flexDirection: "row",
        marginHorizontal: 20,
        backgroundColor: appColors.bg200,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: "center",
        borderRadius: 16,
    },
    input: {
        flex: 1,
        ...appTexts.paragraph2Regular,
        color: appColors.text300,
    },
});

export default styles;
