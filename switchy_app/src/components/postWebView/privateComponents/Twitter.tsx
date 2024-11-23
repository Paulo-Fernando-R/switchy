import { Linking, TouchableWithoutFeedback, View, Image, Text } from "react-native";
import styles from "../postWebViewStyles";

type TwitterProps = {
    url: string;
    img?: string;
    text?: string;
};

export default function Twitter({ url, img, text }: TwitterProps) {
    return (
        <TouchableWithoutFeedback onPress={() => Linking.openURL(url)}>
            <View style={styles.twitterContainer}>
                <Image source={{ uri: img! }} style={styles.twitterImg} />
                <Text numberOfLines={3} style={styles.twitterText}>
                    {text}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
}
