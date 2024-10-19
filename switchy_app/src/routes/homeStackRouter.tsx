import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/home/Home";
import { Text, View } from "react-native";

const Stack = createStackNavigator();

export default function HomeStackRouter() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Group screenOptions={{ presentation: "modal" }}>
                <Stack.Screen name="Tets" component={Tets} />
            </Stack.Group>
        </Stack.Navigator>
    );
}

function Tets() {
    return (
        <View>
            <Text>TESTE</Text>
        </View>
    );
}
