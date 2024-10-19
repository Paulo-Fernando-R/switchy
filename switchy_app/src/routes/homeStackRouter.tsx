import { HomeStackParamList, RootTabsHomeNavigationProp } from "./types/navigationTypes";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useTabBarContext } from "../contexts/tabBarContext";
import { Text, View } from "react-native";
import { useLayoutEffect } from "react";
import Home from "../screens/home/Home";
import Comments from "../screens/comments/Comments";

const Stack = createStackNavigator<HomeStackParamList>();

export default function HomeStackRouter({ navigation, route }: RootTabsHomeNavigationProp) {
    const { setTabBarVisible } = useTabBarContext();

    useLayoutEffect(() => {
        const routName = getFocusedRouteNameFromRoute(route);
        if (routName === "Comments") {
            setTabBarVisible(false);
        } else {
            setTabBarVisible(true);
        }
    }, [route, navigation]);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Group screenOptions={{ presentation: "modal" }}>
                <Stack.Screen name="Comments" component={Comments} initialParams={{ post: undefined }} />
            </Stack.Group>
        </Stack.Navigator>
    );
}
