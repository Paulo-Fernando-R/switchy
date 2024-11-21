import { ProfileStackParamList, RootTabsProfileNavigationProp } from "./types/navigationTypes";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useTabBarContext } from "../contexts/tabBarContext";
import { useLayoutEffect, useState } from "react";
import Comments from "../screens/comments/Comments";
import User from "../screens/user/User";
import UserEdit from "../screens/userEdit/UserEdit";
import Post from "../models/post";
import { PostListContext } from "../contexts/postsListContext";

const Stack = createStackNavigator<ProfileStackParamList>();

export default function ProfileStackRouter({ navigation, route }: RootTabsProfileNavigationProp) {
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
        if (routName === "Comments" || routName === "ProfileEdit") {
            setTabBarVisible(false);
        } else {
            setTabBarVisible(true);
        }
    }, [route, navigation]);

    return (
        <PostListContext.Provider value={{ posts, setPosts: updatePosts, updateOne }}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Profile" component={User} />
                <Stack.Group screenOptions={{ presentation: "modal" }}>
                    <Stack.Screen name="Comments" component={Comments} initialParams={{ postId: undefined }} />
                    <Stack.Screen name="ProfileEdit" component={UserEdit} />
                </Stack.Group>
            </Stack.Navigator>
        </PostListContext.Provider>
    );
}
