import { RootTabsHomeNavigationProp, SearchStackParamList } from "./types/navigationTypes";
import { createStackNavigator } from "@react-navigation/stack";
import Search from "../screens/search/Search";
import SearchProfile from "../screens/searchProfile/SearchProfile";

const Stack = createStackNavigator<SearchStackParamList>();

export default function SearchStackRouter({ navigation, route }: RootTabsHomeNavigationProp) {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SearchProfile">
            <Stack.Screen name="Search" component={Search} />
            <Stack.Group screenOptions={{ presentation: "modal" }}>
                <Stack.Screen name="SearchProfile" component={SearchProfile} initialParams={{ userId: undefined }} />
            </Stack.Group>
        </Stack.Navigator>
    );
}
