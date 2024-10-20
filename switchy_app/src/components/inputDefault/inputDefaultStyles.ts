import { StyleSheet } from "react-native";
import appColors from "../../styles/appColors";
import appTexts from "../../styles/appTexts";

const styles = StyleSheet.create({
    inputBox:{
        flexDirection: "row",
        gap: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: appColors.bg300,
        width: '100%',
        borderRadius: 16,
        height: 48,
        alignItems: 'center'
    },
    input:{
        flex: 1,
        ...appTexts.paragraph1Regular,
        color: appColors.text300
    },
})

export default styles