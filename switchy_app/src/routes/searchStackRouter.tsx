import { RootTabsHomeNavigationProp, SearchStackParamList } from "./types/navigationTypes";
import { createStackNavigator } from "@react-navigation/stack";
import Search from "../screens/search/Search";
import SearchProfile from "../screens/searchProfile/SearchProfile";
import Comments from "../screens/comments/Comments";
import { useLayoutEffect } from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useTabBarContext } from "../contexts/tabBarContext";

const Stack = createStackNavigator<SearchStackParamList>();

export default function SearchStackRouter({ navigation, route }: RootTabsHomeNavigationProp) {
   
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
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Search">
            <Stack.Screen name="Search" component={Search} />
            <Stack.Group screenOptions={{ presentation: "modal" }}>
                <Stack.Screen name="SearchProfile" component={SearchProfile} initialParams={{ userId: undefined }} />
                <Stack.Screen name="Comments" component={Comments} initialParams={{ post: undefined }} />
            </Stack.Group>
        </Stack.Navigator>
    );
}
