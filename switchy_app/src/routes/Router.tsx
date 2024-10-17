import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../screens/login/Login";
import Home from "../screens/home/Home";
import Search from "../screens/search/Search";
import Publish from "../screens/publish/Publish";
import User from "../screens/user/User";
import CustomTabNavigation from "../components/customTabNavigation/CustomTabNavigation";

const Tab = createBottomTabNavigator();
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
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={CustomTabNavigation}>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Search" component={Search} />
                <Tab.Screen name="Publish" component={Publish} />
                <Tab.Screen name="User" component={User} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default function Router() {
    const isAuth = false;
    if (isAuth) {
        return <AuthRouter />;
    }

    return <AppRouter />;
}
