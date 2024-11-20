import React from "react";
import HyperlinkExtractor from "../../utils/hyperlinkExtractor";
import { View, Text, StyleSheet } from "react-native";
import WebView from "react-native-webview";

type PostWebViewProps = {
    text: string | undefined;
};

export default function PostWebView({ text }: PostWebViewProps) {

    const url = HyperlinkExtractor.extractUrl(text);
    if (!url) return null;

    return (
        <View style={styles.container}>
            <WebView source={{ uri: url[0] }} style={styles.web} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        overflow: "hidden",
        borderRadius: 12,
        width: "100%",
        minHeight: 200,
        maxHeight: 400,
    },

    web: {
        flex: 1,
    },
});
