import React from "react";
import SnackBar from "../../../components/snackBar/SnackBar";
import { View, Text } from "react-native";
import PostFeedItem from "../../../components/postFeedItem/PostFeedItem";
import Post from "../../../models/post";
import styles from "../commentsStyles";
import BackButton from "../../../components/backButton/BackButton";

type TopAreaProps = {
    isError: boolean;
    errorMessage: string | undefined;
    sucessMessage?: string | undefined;
    isSuccess: boolean;
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    item?: Post | undefined;
    goBack: () => void;
};

export default function TopArea({ errorMessage, isError, isSuccess, setVisible, visible, item, goBack, sucessMessage }: TopAreaProps) {
    return (
        <>
            {isError && (
                <SnackBar.Error
                    message={errorMessage ?? ""}
                    setVisible={setVisible}
                    visible={visible}
                    autoDismissible={true}
                />
            )}
            {isSuccess && (
                <SnackBar.Sucess
                    message={sucessMessage??"Comentário publicado"}
                    setVisible={setVisible}
                    visible={visible}
                    autoDismissible={true}
                />
            )}

            <View style={styles.header}>
                <BackButton goBack={goBack} />
            </View>
            <View style={styles.mainPost}>
                <PostFeedItem item={item} />
            </View>
            <Text style={styles.title}>Respostas</Text>
        </>
    );
}
