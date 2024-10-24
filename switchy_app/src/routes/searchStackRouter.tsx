import { RootTabsHomeNavigationProp, SearchStackParamList } from "./types/navigationTypes";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/home/Home";
import Search from "../screens/search/Search";

const Stack = createStackNavigator<SearchStackParamList>();

export default function SearchStackRouter({ navigation, route }: RootTabsHomeNavigationProp) {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Search" component={Search} />
            <Stack.Group screenOptions={{ presentation: "modal" }}>
                <Stack.Screen name="SearchProfile" component={Search} initialParams={{ userId: undefined }} />
            </Stack.Group>
        </Stack.Navigator>
    );
}
