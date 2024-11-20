import { HomeStackParamList, RootTabsHomeNavigationProp } from "./types/navigationTypes";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PostListContext } from "../contexts/postsListContext";
import { useTabBarContext } from "../contexts/tabBarContext";
import Comments from "../screens/comments/Comments";
import { useLayoutEffect, useState } from "react";
import Home from "../screens/home/Home";
import Post from "../models/post";

const Stack = createStackNavigator<HomeStackParamList>();

export default function HomeStackRouter({ navigation, route }: RootTabsHomeNavigationProp) {
    const { setTabBarVisible } = useTabBarContext();
    const [posts, setPosts] = useState<Post[] | null>(null);

    const updatePosts = (posts: Post[] | null) => {
        if (!posts) return;
        setPosts([...posts]);
    };

    const updateOne = (post: Post | undefined) => {
        if (!post) return;

        const index = posts?.findIndex((p) => p.id === post.id);
        if (index !== undefined && index !== -1) {
            posts![index] = post;
            setPosts([...posts!]);
        }
    };

    useLayoutEffect(() => {
        const routName = getFocusedRouteNameFromRoute(route);
        if (routName === "Comments") {
            setTabBarVisible(false);
        } else {
            setTabBarVisible(true);
        }
    }, [route, navigation]);

    return (
        <PostListContext.Provider value={{ posts, setPosts: updatePosts, updateOne }}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Group screenOptions={{ presentation: "modal" }}>
                    <Stack.Screen name="Comments" component={Comments} initialParams={{ postId: undefined }} />
                </Stack.Group>
            </Stack.Navigator>
        </PostListContext.Provider>
    );
}
