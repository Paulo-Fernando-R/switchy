import { Text, View, Image, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
//@ts-ignore
import avatar from "../../../assets/icons/avatar.png";
import AntDesign from "@expo/vector-icons/AntDesign";
import appColors from "../../styles/appColors";
import styles from "./postFeedItemStyles";
import React, { useState } from "react";

export default function PostFeedItem() {
    const [liked, setLiked] = useState(false);
    function handleLike() {
        setLiked(!liked);
    }
    return (
        <View style={styles.listItem}>
            <View style={styles.itemAvatar}>
                <Image style={styles.avatarIcon} source={avatar} />
            </View>

            <View style={styles.itemContent}>
                <View style={styles.itemTitle}>
                    <Text style={styles.titleName}>Ferreira</Text>

                    <Text style={styles.titleUname}> @matheus.ocrocodilo</Text>
                    <Text style={styles.titleUname}> 5h</Text>
                </View>
                <Text style={styles.itemContentBody}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed felis id risus consequat
                    tincidunt. Proin mattis eu metus vel aliquet. Suspendisse eu risus eget felis hendrerit fermentum.
                    Quisque bibendum massa sed metus scelerisque ornare.
                </Text>

                <View style={styles.itemContentActions}>
                    <TouchableOpacity style={styles.contentActionButton} onPress={handleLike}>
                        {liked ? (
                            <AntDesign name="heart" size={20} color={appColors.text100} />
                        ) : (
                            <AntDesign name="hearto" size={20} color={appColors.text100} />
                        )}

                        <Text style={styles.contentActionText}>10</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contentActionButton}>
                        <FontAwesome name="comment-o" size={20} color={appColors.text100} />
                        <Text style={styles.contentActionText}>10</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
