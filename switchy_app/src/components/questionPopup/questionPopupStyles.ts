import { StyleSheet } from "react-native";
import appColors from "../../styles/appColors";
import appTexts from "../../styles/appTexts";

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: appColors.overlay,
    },

    modalStyle: {
        backgroundColor: appColors.bg200,
        elevation: 4,
        overflow: "hidden",
        borderRadius: 20,
        width: "80%",
        minHeight:180,
        padding: 20,
        gap: 12,
        justifyContent:'space-between'
    },

    title:{
        
        gap:16
    },

    title1: {
        ...appTexts.paragraph1Regular,
        color: appColors.text100,
    },

    title2: {
        ...appTexts.paragraph2Regular,
        color: appColors.accent200,
    },

    buttons: {
        paddingTop: 18,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,
    },

    button: {
        ...appTexts.paragraph1Regular,
        color: appColors.accent200,
    },
});

export default styles;
