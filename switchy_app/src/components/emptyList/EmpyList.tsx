import { View, Text, Image, Dimensions } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import appTexts from "../../styles/appTexts";
import appColors from "../../styles/appColors";
import blank from "../../../assets/images/blank.png";

type EmptyListProps = { text?: string; screenSizeDivider?: number };

export default function EmptyList({ text, screenSizeDivider }: EmptyListProps) {
    const divider = screenSizeDivider ?? 1;
    return (
        <View
            style={{
                flex: 1,
                height: Dimensions.get("window").height / divider,
                alignItems: "center",
                justifyContent: "center",
                gap: 20,
            }}
        >
            <Image source={blank} style={{ width: 250, height: 250 }} />
            <Text
                style={{
                    ...appTexts.title2Medium,
                    color: appColors.accent100,
                    textAlign: "center",
                }}
            >
                {text ?? "Nenhuma publicação para ver no momento..."}
            </Text>
        </View>
    );
}
