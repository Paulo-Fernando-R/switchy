import React, { useState } from "react";
import { Image, ScrollView, Text, View, TouchableOpacity, TouchableHighlight } from "react-native";
import styles from "./loginStyles";
//@ts-ignore
import logo from "../../../assets/images/logo.png";
import InputDefault from "../../components/inputDefault/InputDefault";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <ScrollView contentContainerStyle={styles.page}>
            <View style={styles.header}>
                <Image style={styles.logo} source={logo} />
                <Text style={styles.headerText}>Switchy</Text>
            </View>

            <View style={styles.body}>
                <Text style={styles.title}>Entre em sua conta do Switchy</Text>
                <InputDefault text={email} setText={setEmail} placeholder="E-mail" />
                <InputDefault text={password} setText={setPassword} password={true} placeholder="Senha" />
                <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </View>
            <TouchableHighlight style={styles.textButton}>
                <Text style={styles.textButtonText}>Crie sua conta</Text>
            </TouchableHighlight>
        </ScrollView>
    );
}
