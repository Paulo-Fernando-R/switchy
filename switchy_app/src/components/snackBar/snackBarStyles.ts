import { Dimensions, StyleSheet } from "react-native";
import appColors from "../../styles/appColors";
import appTexts from "../../styles/appTexts";

const styles = StyleSheet.create({
    containerSucess: {
        width: Dimensions.get('screen').width - 40,
        height: 50,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "flex-start",
        alignSelf: 'center',
        backgroundColor:appColors.accent300,
        position: "absolute",
        zIndex: 100,
        paddingHorizontal: 20,
        top: 40,
        borderRadius: 10,
        elevation: 2,
        gap: 8
    },
    text:{
        ...appTexts.paragraph1Regular,
        color: appColors.text100,
        flex: 1
    },
    containerError: {
        width: Dimensions.get('screen').width - 40,
        height: 50,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "flex-start",
        alignSelf: 'center',
        backgroundColor:appColors.error,
        position: "absolute",
        zIndex: 100,
        paddingHorizontal: 20,
        top: 40,
        borderRadius: 10,
        elevation: 2,
        gap: 8
    },
});

export default styles;
