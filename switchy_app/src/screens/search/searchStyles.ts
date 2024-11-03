import { StyleSheet } from "react-native";
import appColors from "../../styles/appColors";
import appTexts from "../../styles/appTexts";

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: appColors.bg100,
    },
    header: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: 16,
        paddingBottom: 30,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    logo: {
        width: 48,
        height: 48,
    },
    headerText: {
        ...appTexts.title1SemiBold,
        color: appColors.accent200,
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
        alignItems: "center",
    },
    input: {
        flex: 1,
        ...appTexts.paragraph1Regular,
        color: appColors.text300,
    },

    list: {
        gap: 8,
        paddingTop: 16,
        paddingHorizontal: 20,
        paddingBottom: 80
    },

    listItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingVertical: 12,
        borderBottomColor: appColors.stroke100,
        borderBottomWidth: 1,
    },

    avatarBox: {
        width: 48,
        height: 48,
        borderRadius: 100,
        backgroundColor: appColors.bg300,
        justifyContent: "center",
        alignItems: "center",
    },

    textBox: {
        gap: 4,
    },
    name: {
        ...appTexts.paragraph1Regular,
        color: appColors.text100,
    },
    userName: {
        ...appTexts.paragraph2Regular,
        color: appColors.text300,
    },

    emptyList:{
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 20,
        paddingHorizontal: 20,
        flex: 1
    },
    emptyText:{
        ...appTexts.paragraph1Regular,
        color: appColors.text400,
        textAlign: 'center'
    }
});

export default styles;
