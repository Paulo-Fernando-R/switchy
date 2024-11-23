import { TouchableWithoutFeedback, Image, Text, View, Linking } from "react-native";
import styles from "../postWebViewStyles";

type OptionsProps = {
    url: string;
    img?: string;
    text?: string;
};

export default function CardTitle({ img, text, url }: OptionsProps) {
    return (
        <TouchableWithoutFeedback onPress={() => Linking.openURL(url)}>
            <View style={styles.cardTitleContainer}>
                <Image source={{ uri: img! }} style={styles.cardTitleImg} />
                <Text numberOfLines={3} style={styles.cardTitleText}>
                    {text}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
}
