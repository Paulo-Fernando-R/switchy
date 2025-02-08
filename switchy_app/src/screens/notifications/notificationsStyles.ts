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
    headerText: {
        ...appTexts.title1SemiBold,
        color: appColors.accent200,
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
