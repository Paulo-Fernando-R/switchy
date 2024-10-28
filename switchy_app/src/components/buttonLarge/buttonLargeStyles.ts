import { StyleSheet } from "react-native";
import appTexts from "../../styles/appTexts";

const styles = StyleSheet.create({

    largeButton:{
        height:45,
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: "center",   
        justifyContent: "center",
        borderRadius: 16
    },
    text:{
        ...appTexts.title2Medium,
        
    }

});

export default styles;
