import CustomTabNavigation from "../components/customTabNavigation/CustomTabNavigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useTabBarContext } from "../contexts/tabBarContext";
import { useAuthContext } from "../contexts/authContext";
import { RootTabsParamList } from "./types/navigationTypes";
import KeyboardStateEnum from "../enums/keyboardStateEnum";
import ProfileStackRouter from "./profileStackRouter";
import SearchStackRouter from "./searchStackRouter";
import Publish from "../screens/publish/Publish";
import HomeStackRouter from "./homeStackRouter";
import useKeyboard from "../hooks/useKeyboard";
import Login from "../screens/login/Login";
import { View } from "react-native";
import React from "react";

const Tab = createBottomTabNavigator<RootTabsParamList>();
const Stack = createStackNavigator();

function AuthRouter() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

function AppRouter() {
    const { tabBarVisible } = useTabBarContext();
    const keyboard = useKeyboard();

    const handleBar = () => {
        if (!tabBarVisible || keyboard === KeyboardStateEnum.show) {
            return false;
        }
        return true;
    };

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}
                tabBar={handleBar() ? CustomTabNavigation : () => <View></View>}
                sceneContainerStyle={{ paddingTop: 24 }}
            >
                <Tab.Screen name="HomeStack" component={HomeStackRouter} />
                <Tab.Screen name="SearchStack" component={SearchStackRouter} />
                <Tab.Screen name="Publish" component={Publish} />
                <Tab.Screen name="ProfileStack" component={ProfileStackRouter} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default function Router() {
    const { auth } = useAuthContext();

    const isAuth = () => {
        if (!auth) {
            return false;
        }
        // if (Date.now() > auth.accessTokenExpiresAtUtc.getTime()) {
        //     return false;
        // }

        return true;
    };

    if (!isAuth()) {
        return <AuthRouter />;
    }

    return <AppRouter />;
}
