import { StyleSheet } from "react-native";
import appColors from "../../styles/appColors";
import appTexts from "../../styles/appTexts";

const styles = StyleSheet.create({
    InstagraContainer: {
        overflow: "hidden",
        borderRadius: 12,
        width: "100%",
        // minHeight: 200,
        maxHeight: 400,
        aspectRatio: 4 / 5,
    },
    instagramWeb: {
        flex: 1,
        marginTop: -50,
        marginBottom: -50,
    },

    imageContainer:{
        overflow: "hidden",
        borderRadius: 12,
        width: "100%",
         minHeight: 200,
        maxHeight: 400,
    },

    defaultContainer: {
        overflow: "hidden",
        borderRadius: 12,
        width: "100%",

        maxHeight: 400,
    },
    youtubeContainer: {
        aspectRatio: 16 / 9,
        width: "100%",
        overflow: "hidden",
        borderRadius: 12,
    },
    youtubeWeb: {
        flex: 1,
    },

    twitterContainer: {
        flexDirection: "row",
        gap: 12,
        padding: 12,
        borderRadius: 24,
        backgroundColor: appColors.bg200,
        alignItems: "center",
        height: 100,
    },

    twitterImg: {
        height: "100%",
        aspectRatio: 1,
        objectFit: "cover",
        overflow: "hidden",
        borderRadius: 12,
    },

    twitterText: {
        flex: 1,
        color: appColors.text200,
        ...appTexts.paragraph3Regular,
    },

    tiktokContainer: {
        overflow: "hidden",
        borderRadius: 12,
        width: "100%",
        // minHeight: 200,
        maxHeight: 400,
        aspectRatio: 9 / 16,
    },
});

export default styles;
