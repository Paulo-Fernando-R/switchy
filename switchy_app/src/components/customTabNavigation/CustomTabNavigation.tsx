import {
    BottomTabDescriptorMap,
    BottomTabNavigationEventMap,
} from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import { NavigationHelpers, ParamListBase, TabNavigationState } from "@react-navigation/native";
import { View, TouchableOpacity, Image } from "react-native";
import styles from "./customTabNavigationStyles";
import { ReactNode} from "react";

//@ts-ignore
import homeFill from "../../../assets/icons/homeFill.png";
//@ts-ignore
import homeOut from "../../../assets/icons/homeOut.png";
//@ts-ignore
import searchFill from "../../../assets/icons/searchFill.png";
//@ts-ignore
import searchOut from "../../../assets/icons/searchOut.png";
//@ts-ignore
import addFill from "../../../assets/icons/addFill.png";
//@ts-ignore
import addOut from "../../../assets/icons/addOut.png";
//@ts-ignore
import userFill from "../../../assets/icons/userFill.png";
//@ts-ignore
import userOut from "../../../assets/icons/userOut.png";

type CustomTabNavigationProps = {
    state: TabNavigationState<ParamListBase>;
    descriptors: BottomTabDescriptorMap;
    navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
};

type TabBarItemProps = {
    isFocused: boolean;
    tabBarAccessibilityLabel: string | undefined;
    tabBarTestID: string | undefined;
    onPress: () => void;
    onLongPress: () => void;
    children: ReactNode | undefined;
};

export default function CustomTabNavigation({ state, descriptors, navigation }: CustomTabNavigationProps) {
    const icons = [
        (selected: boolean) => <Image style={styles.image} source={selected ? homeFill : homeOut} />,
        (selected: boolean) => <Image style={styles.image} source={selected ? searchFill : searchOut} />,
        (selected: boolean) => <Image style={styles.image} source={selected ? addFill : addOut} />,
        (selected: boolean) => <Image style={styles.image} source={selected ? addFill : addOut} />,
        (selected: boolean) => <Image style={styles.image} source={selected ? userFill : userOut} />,
    ];
   

    return (
        <View style={styles.tabBarBox}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: "tabLongPress",
                        target: route.key,
                    });
                };

                return (
                    <TabBarItem
                        isFocused={isFocused}
                        onLongPress={onLongPress}
                        onPress={onPress}
                        key={index}
                        tabBarAccessibilityLabel={options.tabBarAccessibilityLabel}
                        tabBarTestID={options.tabBarTestID}
                    >
                        {icons[index](isFocused)}
                    </TabBarItem>
                );
            })}
        </View>
    );
}

function TabBarItem({
    isFocused,
    tabBarAccessibilityLabel,
    tabBarTestID,
    onPress,
    onLongPress,
    children,
}: TabBarItemProps) {
    return (
        <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={tabBarAccessibilityLabel}
            testID={tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarButton}
        >
            {children}
        </TouchableOpacity>
    );
}
