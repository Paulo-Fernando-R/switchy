import { StyleSheet } from "react-native";
import appColors from "../../styles/appColors";
import appTexts from "../../styles/appTexts";

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: appColors.bg100,
        paddingTop: 12,
        gap: 8,
        paddingBottom: 20
    },

    header:{
        paddingHorizontal: 20,
        paddingBottom: 30
    },

    mainPost:{
        paddingHorizontal: 20
    },
    title:{
        ...appTexts.paragraph2Regular,
        color: appColors.text300,
        paddingLeft: 20,
        paddingTop: 8
    },
    list:{
        gap: 8,
        paddingTop: 12,
        paddingHorizontal: 40,
        paddingBottom:20
    },
    inputBox:{
        flexDirection: "row",
        marginHorizontal: 20,
        backgroundColor: appColors.bg200,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderRadius: 16
    },
    input:{
        flex: 1,
        ...appTexts.paragraph2Regular,
        color:appColors.text300
    }

});

export default styles