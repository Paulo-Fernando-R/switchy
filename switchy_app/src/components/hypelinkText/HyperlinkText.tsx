import React from "react";
import Hyperlink from "react-native-hyperlink";
import { StyleProp, Text, TextStyle, StyleSheet } from "react-native";
import appColors from "../../styles/appColors";

type HyperlinkTextProps = {
    text: string;
    numberOfLines?: number;
    textStyle?: StyleProp<TextStyle>;
    linkStyle?: StyleProp<TextStyle>;
    onPress?: ((url: string, text?: string) => void) | undefined;
    onLongPress?: ((url: string, text?: string) => void) | undefined;
    
};

export default function HyperlinkText({
    text,
    numberOfLines,
    textStyle,
    linkStyle,
    onPress,
    onLongPress,

}: HyperlinkTextProps) {
    function extractText(url: string) {
        return url.match(new RegExp(`(?<=:\/\/)(?:www\.)?[^\/]+`))?.join("") ?? url;
    }
    return (
        <Hyperlink
            linkDefault={true}
            linkStyle={linkStyle ? linkStyle : styles.defaultLinkStyle}
            onLongPress={onLongPress}
            onPress={onPress}
            linkText={extractText}
        >
            <Text style={textStyle} numberOfLines={numberOfLines}>
                {text}
            </Text>
        </Hyperlink>
    );
}

const styles = StyleSheet.create({
    defaultLinkStyle: {
        color: appColors.accent300,
        textDecorationStyle: "solid",
        textDecorationLine: "underline",
        textDecorationColor: appColors.accent300,
    },
});
