import React, { useState } from "react";
import { Text, TouchableOpacity, View, TextInput, ScrollView } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import appColors from "../../styles/appColors";
import ButtonDefault from "../../components/buttonDefault/ButtonDefault";
import styles from "./publishStyles";

export default function Publish() {
    const [text, setText] = useState("");
    return (
        <View style={styles.page}>
            <View style={styles.header}>
                <TouchableOpacity activeOpacity={0.8}>
                    <AntDesign name="close" size={24} color={appColors.text200} />
                </TouchableOpacity>

                <ButtonDefault backgroundColor={appColors.accent300} textColor={appColors.text100} text="Publicar" />
            </View>
            <View style={styles.titleBox}>
                <Text style={styles.name}>Ferreira</Text>
                <Text style={styles.userName}>@matheus.ocrocodilo</Text>
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
            <Text style={styles.bottom}>Qualquer pessoa poderá ver e responder</Text>
        </View>
    );
}
