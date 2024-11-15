import React, { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import InputDefault from "../../components/inputDefault/InputDefault";
import { useMutation } from "@tanstack/react-query";
import LoginController from "./recoveryController";
import styles from "./recoveryStyles";
import SnackBar from "../../components/snackBar/SnackBar";
import { AuthNavigationProp } from "../../routes/types/navigationTypes";
import BackButton from "../../components/backButton/BackButton";

type RecoveryProps = {
    navigation: AuthNavigationProp;
};

export default function Recovery({ navigation }: RecoveryProps) {
    const controller = new LoginController();
    const [email, setEmail] = useState("");
    const [state, setState] = useState(false);
    const [sucess, setSucess] = useState(false);

    const mutation = useMutation({
        mutationFn: () => controller.signIn(email),
        onSuccess: () => setSucess(true),
        onError: () => setState(true),
    });

    const goBack = () => navigation.navigate("Login");

    return (
        <ScrollView contentContainerStyle={styles.page}>
            <SnackBar.Error
                visible={state}
                setVisible={setState}
                message={mutation.error?.message!}
                autoDismissible={true}
            />
            <SnackBar.Sucess
                visible={sucess}
                setVisible={setSucess}
                message={"Email enviado com sucesso!"}
                autoDismissible={true}
            />
            <View style={styles.header}>
                <BackButton goBack={goBack} />
            </View>
            <View style={styles.headerTitle}>
                <Text style={styles.title}>Recuperação de senha</Text>
                <Text style={styles.title2}>
                    Informe seu e-mail e enviaremos uma senha nova para que você possa entrar no App
                </Text>
            </View>
            <View style={styles.body}>
                <InputDefault text={email} setText={setEmail} placeholder="E-mail" />

                <TouchableOpacity
                    disabled={mutation.isPending}
                    style={styles.button}
                    activeOpacity={0.8}
                    onPress={() => mutation.mutate()}
                >
                    <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
