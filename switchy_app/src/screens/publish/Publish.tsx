import React, { useState } from "react";
import { Text, TouchableOpacity, View, TextInput, ScrollView } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import appColors from "../../styles/appColors";
import ButtonDefault from "../../components/buttonDefault/ButtonDefault";
import styles from "./publishStyles";
import useKeyboard from "../../hooks/useKeyboard";
import KeyboardStateEnum from "../../enums/keyboardStateEnum";
import { useUserContext } from "../../contexts/userContext";
import { RootTabsPublishNavigationProp } from "../../routes/types/navigationTypes";
import { useMutation } from "@tanstack/react-query";
import PublishController from "./publishController";
import SnackBar from "../../components/snackBar/SnackBar";

export default function Publish({ navigation, route }: RootTabsPublishNavigationProp) {
    const controller = new PublishController();
    const [text, setText] = useState("");
    const keyBoard = useKeyboard();
    const { user } = useUserContext();
    const [snackBarError, setSnackBarError] = useState(false);
    const [snackBarSucess, setSnackBarSucess] = useState(false);

    function navigate() {
        navigation.navigate("HomeStack", { screen: "Home" });
    }

    const mutation = useMutation({
        mutationFn: () => controller.createPost(text),
        onError: () => controller.handleError(setSnackBarError),
        onSuccess: () => controller.handleSucess(setSnackBarSucess, navigate, setText),
    });

    return (
        <View style={styles.page}>
            {snackBarError && (
                <SnackBar.Error
                    message={mutation.error?.message!}
                    setVisible={setSnackBarError}
                    visible={snackBarError}
                    autoDismissible={true}
                />
            )}
            {snackBarSucess && (
                <SnackBar.Sucess
                    message={"Publicado com sucesso"}
                    setVisible={setSnackBarSucess}
                    visible={snackBarSucess}
                    autoDismissible={true}
                    autoDismissTime={2000}
                />
            )}
            <View style={styles.header}>
                <TouchableOpacity activeOpacity={0.8} onPress={navigate}>
                    <AntDesign name="close" size={24} color={appColors.text200} />
                </TouchableOpacity>

                <ButtonDefault
                    disabled={mutation.isPending}
                    action={() => mutation.mutate()}
                    backgroundColor={appColors.accent300}
                    textColor={appColors.text100}
                    text="Publicar"
                />
            </View>
            <View style={styles.titleBox}>
                <Text style={styles.name}>{user?.name}</Text>
                <Text style={styles.userName}>@{user?.userName}</Text>
            </View>
            <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
                <TextInput
                    multiline={true}
                    style={styles.input}
                    placeholder="Quais são as novidades?"
                    placeholderTextColor={appColors.text300}
                    value={text}
                    onChangeText={(text) => {
                        if (text.length > 512) return;
                        setText(text);
                    }}
                />
                <Text style={styles.userName}>{text.length}/512</Text>
            </ScrollView>
            <Text style={[styles.bottomClose, { paddingBottom: keyBoard === KeyboardStateEnum.hidden ? 95 : 20 }]}>
                Qualquer pessoa poderá ver e responder
            </Text>
        </View>
    );
}
