import { StyleSheet } from "react-native";
import appTexts from "../../styles/appTexts";

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 30,
        paddingVertical: 6,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "baseline",
        borderRadius: 10,
        borderWidth: 1,
    },
    buttonText: {
        ...appTexts.paragraph1Regular,
    },
});

export default styles;
