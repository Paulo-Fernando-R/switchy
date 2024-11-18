import { ActivityIndicator, Image, ScrollView, Text, TouchableHighlight, View } from "react-native";
//@ts-ignore
import logo from "../../../assets/images/logo.png";
import InputDefault from "../../components/inputDefault/InputDefault";
import { TouchableOpacity } from "react-native-gesture-handler";
import SnackBar from "../../components/snackBar/SnackBar";
import { useState } from "react";
import styles from "./signUpStyles";
import { useMutation } from "@tanstack/react-query";
import SignUpController from "./signUpController";
import { useAuthContext } from "../../contexts/authContext";
import { AuthNavigationProp } from "../../routes/types/navigationTypes";
import appColors from "../../styles/appColors";

type SignUpProps = {
    navigation: AuthNavigationProp;
};

export default function SignUp({ navigation }: SignUpProps) {
    const controller = new SignUpController();

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [state, setState] = useState(false);

    var { setAuth } = useAuthContext();

    const mutation = useMutation({
        mutationFn: () => controller.signUp(name, username, email, password, setAuth),
        onError: () => setState(true),
        onSuccess: () => navigation.navigate("Login"),
    });

    const navigate = () => navigation.navigate("Login");

    return (
        <ScrollView contentContainerStyle={styles.page}>
            <SnackBar.Error
                visible={state}
                setVisible={setState}
                message={mutation.error?.message!}
                autoDismissible={true}
            />

            <View style={styles.header}>
                <Image style={styles.logo} source={logo} />
                <Text style={styles.headerText}>Switchy</Text>
            </View>

            <View style={styles.body}>
                <Text style={styles.title}>Crie sua conta do Switchy</Text>
                <InputDefault text={name} setText={setName} placeholder="Nome" />
                <InputDefault text={username} setText={setUsername} placeholder="Nome de usuário" />
                <InputDefault text={email} setText={setEmail} placeholder="E-mail" />
                <InputDefault text={password} setText={setPassword} password={true} placeholder="Senha" />
                <TouchableOpacity disabled={mutation.isPending} style={styles.button} activeOpacity={0.8} onPress={() => mutation.mutate()}>
                    {!mutation.isPending ? (
                        <Text style={styles.buttonText}>Criar</Text>
                    ) : (
                        <ActivityIndicator size="small" color={appColors.text300} />
                    )}
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.textButton}
                onPress={navigate}
                disabled={mutation.isPending}
            >
                <Text style={styles.textButtonText}>Faça Login</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
