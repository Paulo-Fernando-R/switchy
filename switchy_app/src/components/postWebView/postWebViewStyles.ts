import { StyleSheet } from "react-native";

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
        width: "60%",
        aspectRatio: 16 / 9,
        overflow: "hidden",
        borderRadius: 12,
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
