import ModalButton from "../../../components/bottomModal/privateComponents/ModalButton";
import QuestionPopup from "../../../components/questionPopup/QuestionPopup";
import BottomModal from "../../../components/bottomModal/BottomModal";
import { View, Image, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
//@ts-ignore
import logo from "../../../../assets/images/logo.png";
import AntDesign from "@expo/vector-icons/AntDesign";
import appColors from "../../../styles/appColors";
import { Modalize } from "react-native-modalize";
import Feather from "@expo/vector-icons/Feather";
import User from "../../../models/user";
import React, { useRef, useState } from "react";
import styles from "../userStyles";
import SnackBar from "../../../components/snackBar/SnackBar";
import { useMutation } from "@tanstack/react-query";

type ProfileHeaderProps = {
    user: User | null;
    navigate: () => void;
    logout: () => Promise<void>;
    deleteAccount: () => Promise<void>;
};

export default function Header({ user, navigate, logout, deleteAccount }: ProfileHeaderProps) {
    const modalizeRef = useRef<Modalize>(null);
    const [popup, setPopup] = React.useState(false);
    const [popupDelete, setPopupDelete] = React.useState(false);
    const [errorSnackBar, setErrorSnackBar] = useState(false);

    const mutation = useMutation({
        mutationFn: () => handleDelete(),
        onError: () => setErrorSnackBar(true),
    });

    const handleOpenModal = () => {
        modalizeRef.current?.open();
    };

    function openPopup() {
        setPopup(true);
        modalizeRef.current?.close();
    }

    function openPopupDelete() {
        setPopupDelete(true);
        modalizeRef.current?.close();
    }

    function editProfile() {
        navigate();
        modalizeRef.current?.close();
    }

    async function handleDelete() {
        setPopupDelete(false);
        await deleteAccount();
    }
    return (
        <View>
            <QuestionPopup
                visibility={popup}
                setVisibility={setPopup}
                title="Fazer logout"
                description="Tem certeza que deseja sair da sua conta?"
                action={logout}
                actionText="Logout"
            />

            <QuestionPopup
                visibility={popupDelete}
                setVisibility={setPopupDelete}
                title="Deseja excluir sua conta?"
                description="Tem certeza que deseja excluir sua conta? Esta ação nao pode ser desfeita."
                action={mutation.mutate}
                actionText="Excluir"
            />
            <SnackBar.Error
                message={mutation.error?.message ?? ""}
                setVisible={setErrorSnackBar}
                visible={errorSnackBar}
                autoDismissible={true}
            />
            <BottomModal modalizeRef={modalizeRef}>
                <Text style={styles.modalSubtitle}>Opções</Text>
                <ModalButton
                    action={editProfile}
                    text="Editar perfil"
                    icon={<Feather name="edit-3" size={24} color={appColors.text200} />}
                />
                <ModalButton
                    action={openPopup}
                    text="Sair da conta"
                    icon={<MaterialIcons name="logout" size={24} color={appColors.text200} />}
                />
                <Text style={styles.modalSubtitleRed}>Área de risco</Text>
                <ModalButton
                    action={openPopupDelete}
                    text="Excluir conta"
                    icon={<MaterialIcons name="delete-outline" size={24} color={appColors.error} />}
                />
            </BottomModal>

            <View style={styles.header}>
                <Image style={styles.logo} source={logo} />
                <Text style={styles.headerText}>Switchy</Text>
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
