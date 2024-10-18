import appColors from "./appColors";
import type { TextStyle } from "react-native";

const title1SemiBold: TextStyle = {
    fontFamily: "Roboto",
    fontWeight: "semibold",
    fontSize: 24,
    color: appColors.text100,
};
const title2Medium: TextStyle = {
    fontFamily: "Roboto",
    fontWeight: "medium",
    fontSize: 16,
    color: appColors.text100,
};
const paragraph1Regular: TextStyle = {
    fontFamily: "Roboto",
    fontWeight: "regular",
    fontSize: 15,
    color: appColors.text100,
};
const paragraph2Regular: TextStyle = {
    fontFamily: "Roboto",
    fontWeight: "regular",
    fontSize: 14,
    color: appColors.text100,
};
const paragraph3Regular: TextStyle = {
    fontFamily: "Roboto",
    fontWeight: "regular",
    fontSize: 13,
    color: appColors.text100,
};

const appTexts = {
    title1SemiBold,
    title2Medium,
    paragraph1Regular,
    paragraph2Regular,
    paragraph3Regular,
};

export default appTexts;
