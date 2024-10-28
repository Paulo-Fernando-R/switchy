import { ProfileStackParamList, RootTabsProfileNavigationProp } from "./types/navigationTypes";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useTabBarContext } from "../contexts/tabBarContext";
import { useLayoutEffect } from "react";
import Comments from "../screens/comments/Comments";
import User from "../screens/user/User";
import UserEdit from "../screens/userEdit/UserEdit";

const Stack = createStackNavigator<ProfileStackParamList>();

export default function ProfileStackRouter({ navigation, route }: RootTabsProfileNavigationProp) {
    const { setTabBarVisible } = useTabBarContext();

    useLayoutEffect(() => {
        const routName = getFocusedRouteNameFromRoute(route);
        if (routName === "Comments" || routName === "ProfileEdit") {
            setTabBarVisible(false);
        } else {
            setTabBarVisible(true);
        }
    }, [route, navigation]);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Profile" component={User} />
            <Stack.Group screenOptions={{ presentation: "modal" }}>
                <Stack.Screen name="Comments" component={Comments} initialParams={{ post: undefined }} />
                <Stack.Screen name="ProfileEdit" component={UserEdit} />
            </Stack.Group>
        </Stack.Navigator>
    );
}
