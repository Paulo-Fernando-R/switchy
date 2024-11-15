import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View, TouchableOpacity, TouchableHighlight, Button } from "react-native";
import InputDefault from "../../components/inputDefault/InputDefault";
import { useAuthContext } from "../../contexts/authContext";
import { useMutation } from "@tanstack/react-query";
//@ts-ignore
import logo from "../../../assets/images/logo.png";
import LoginController from "./loginController";
import styles from "./loginStyles";
import SnackBar from "../../components/snackBar/SnackBar";
import { AuthNavigationProp } from "../../routes/types/navigationTypes";

type LoginProps = {
    navigation: AuthNavigationProp;
};

export default function Login({ navigation }: LoginProps) {
    const controller = new LoginController();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [state, setState] = useState(false);

    const { setAuth } = useAuthContext();

    const mutation = useMutation({
        mutationFn: () => controller.signIn(email, password, setAuth),
    });

    useEffect(() => {
        setState(mutation.isError);
    }, [mutation.isError]);

    const navigate = () => navigation.navigate("SignUp");
    const recovery = () => navigation.navigate("Recovery");

    return (
        <ScrollView contentContainerStyle={styles.page}>
            <SnackBar.Error visible={state} setVisible={setState} message="Erro no login" autoDismissible={true} />
            <View style={styles.header}>
                <Image style={styles.logo} source={logo} />
                <Text style={styles.headerText}>Switchy</Text>
            </View>

            <View style={styles.body}>
                <Text style={styles.title}>Entre em sua conta do Switchy</Text>
                <InputDefault text={email} setText={setEmail} placeholder="E-mail" />
                <InputDefault text={password} setText={setPassword} password={true} placeholder="Senha" />

                <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => mutation.mutate()}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} style={styles.textButton} onPress={recovery}>
                    <Text style={styles.textButtonText}>Esqueceu sua senha?</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity activeOpacity={0.5} style={styles.textButton} onPress={navigate}>
                <Text style={styles.textButtonText}>Crie sua conta</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
