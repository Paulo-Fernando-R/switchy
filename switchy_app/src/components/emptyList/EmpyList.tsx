import { View, Text } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import appTexts from "../../styles/appTexts";
import appColors from "../../styles/appColors";

type EmptyListProps = { text?: string };

export default function EmptyList({ text }: EmptyListProps) {
    return (
        <View
            style={{
                flex: 1,
                height: 300,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <MaterialCommunityIcons name="flask-empty-outline" size={96} color={appColors.accent100} />
            <Text
                style={{
                    ...appTexts.title2Medium,
                    color: appColors.accent100,
                }}
            >
                {text ?? "Nenhuma publicação encontrada"}
            </Text>
        </View>
    );
}
