import { StyleSheet } from "react-native";
import appColors from "../../styles/appColors";
import appTexts from "../../styles/appTexts";

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: appColors.bg100,
        paddingTop: 20,
        gap: 12,
        //paddingBottom: 20,
        
    },

    list:{
        paddingTop: 20,
        gap: 12,
        paddingBottom: 30,
    },

    header: {
        paddingHorizontal: 20,
        paddingBottom: 0,
    },

    formTitle:{
        ...appTexts.title2Medium,
        color: appColors.accent200,
        paddingVertical: 8,
        paddingHorizontal: 4
    },

    form:{
        padding: 12,
        gap: 12,
        borderRadius: 20,
        backgroundColor: appColors.bg200,
       
    },
    body:{
        paddingHorizontal: 20,
        gap: 16
    }
})

export default styles