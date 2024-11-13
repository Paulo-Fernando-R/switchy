import { StyleSheet } from "react-native";
import appColors from "../../styles/appColors";
import appTexts from "../../styles/appTexts";

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: appColors.bg100,
        paddingHorizontal: 20,
        paddingVertical: 48,
        justifyContent: "space-between",
    },
    
    header: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    logo:{
        width: 48,
        height: 48
    },
    headerText:{
        ...appTexts.title2Medium,
        color: appColors.accent200
    },

    body:{
        gap: 20,
        alignItems: 'center',
    },
    title:{
        ...appTexts.title1SemiBold,
        color: appColors.accent200
    },
    button:{
        backgroundColor: appColors.accent300,
        borderRadius: 16,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
        width: '100%',
        height: 48
    },
    buttonText:{
        ...appTexts.title2Medium,
        color:appColors.text100
    },

    textButton:{
        alignItems: 'center'
    },
    textButtonText:{
        ...appTexts.paragraph1Regular,
        color:appColors.accent300
    }
});

export default styles;