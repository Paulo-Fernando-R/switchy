import React from "react";
import { TouchableWithoutFeedback, Image, Linking } from "react-native";
import styles from "../postWebViewStyles";
type ImagePreviewProps = {
    url: string;
    img?: string;
};

export default function ImagePreview({ url, img }: ImagePreviewProps) {
    return (
        <TouchableWithoutFeedback onPress={() => Linking.openURL(url)}>
            <Image source={{ uri: img! }} style={styles.imageContainer} />
        </TouchableWithoutFeedback>
    );
}
