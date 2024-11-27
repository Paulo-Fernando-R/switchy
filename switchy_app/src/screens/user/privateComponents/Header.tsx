import React, { useRef } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import styles from "../userStyles";
import Feather from "@expo/vector-icons/Feather";
import User from "../../../models/user";
//@ts-ignore
import logo from "../../../../assets/images/logo.png";
import appColors from "../../../styles/appColors";
import { Modalize } from "react-native-modalize";
import BottomModal from "../../../components/bottomModal/BottomModal";
import ModalButton from "../../../components/bottomModal/privateComponents/ModalButton";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

type ProfileHeaderProps = {
    user: User | null;
    navigate: () => void;
};

export default function Header({ user, navigate }: ProfileHeaderProps) {
    const modalizeRef = useRef<Modalize>(null);
    const handleOpenModal = () => {
        modalizeRef.current?.open();
    };
    return (
        <View>
            <BottomModal modalizeRef={modalizeRef}>
            <Text style={styles.modalSubtitle}>Opções</Text>
                <ModalButton
                    action={() => {}}
                    text="Editar perfil"
                    icon={<Feather name="edit-3" size={24} color={appColors.text200} />}
                />
                <ModalButton
                    action={() => {}}
                    text="Sair da conta"
                    icon={<MaterialIcons name="logout" size={24} color={appColors.text200} />}
                />
                <Text style={styles.modalSubtitleRed}>Área de risco</Text>
                <ModalButton
                    action={() => {}}
                    text="Excluir conta"
                    icon={<MaterialIcons name="delete-outline" size={24} color={appColors.error} />}
                />
            </BottomModal>

            <View style={styles.header}>
                <Image style={styles.logo} source={logo} />
                <Text style={styles.headerText}>Swithcy</Text>
            </View>

            <View style={styles.profileBox}>
                <View style={styles.nameBox}>
                    <Text style={styles.name}>{user?.name}</Text>
                    <TouchableOpacity activeOpacity={0.5} onPress={handleOpenModal}>
                       
                        <AntDesign name="setting" size={20} color={appColors.text300} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.userName}>@{user?.userName}</Text>
                <Text style={styles.bio}>{user?.description}</Text>

                <View style={styles.buttons}>
                    <Text style={styles.follow}>{user?.followers?.length} Seguidores</Text>
                    <Text style={styles.follow}>{user?.following?.length} Seguindo</Text>
                </View>
            </View>
            <Text style={styles.subtitle}>Publicações</Text>
        </View>
    );
}
