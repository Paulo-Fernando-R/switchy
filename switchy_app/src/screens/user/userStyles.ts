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

        //paddingTop: 20,
    },
    logo: {
        width: 48,
        height: 48,
    },
    headerText: {
        ...appTexts.title2Medium,
        color: appColors.accent200,
    },

    profileBox: {
        gap: 8,
       // paddingHorizontal: 20,
        paddingBottom: 12,
    },
    nameBox: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "baseline",
        gap: 8,
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
        ...appTexts.paragraph3Regular,
        color: appColors.text300,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: 20
    },

    subtitle: {
        ...appTexts.paragraph1Regular,
        color: appColors.text200,
        //paddingHorizontal: 20,
        paddingVertical: 8,
    },

    list: {
        gap: 8,
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 80,
    },

    modalSubtitle:{
        ...appTexts.paragraph1Regular,
        fontWeight: 'bold',
        color: appColors.accent300,
        paddingHorizontal: 6,
        paddingTop: 10
    },
    modalSubtitleRed:{
        ...appTexts.paragraph1Regular,
        fontWeight: 'bold',
        color: appColors.error,
        paddingHorizontal: 6,
        paddingTop: 10
    }
});

export default styles;
