import { StyleSheet } from "react-native";
import appColors from "../../styles/appColors";
import appTexts from "../../styles/appTexts";

const styles = StyleSheet.create({
   
    button:{
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },

    headerText: {
        ...appTexts.title2Medium,
        color: appColors.accent200
    }
    
});

export default styles