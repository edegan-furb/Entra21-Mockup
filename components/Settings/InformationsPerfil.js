import { View, Text, StyleSheet, Pressable, ActivityIndicator, Image, SafeAreaView, TextInput} from "react-native";
import { Ionicons, Entypo } from '@expo/vector-icons';
import { Colors } from "../../constants/styles";
import React, { useState, useEffect } from "react";
import {
    uploadPicture,
    getImageUrlByName,
    getCurrrentUserImageName,
} from "../../util/firebase/storage";
import { fetchUsernameAndEmail, updateUsername } from "../../util/firebase/firestore/user";
import { useTheme } from "../../store/theme-context";

export default function ModalInformationsPerfil() {

    const { colors } = useTheme();

    const [imageSource, setImageSource] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState("Loading...");
    const [email, setEmail] = useState("Loading..");
    const [isEditing, setIsEditing] = useState(false);
    const [editUsername, setEditUsername] = useState("");

    useEffect(() => {
        setIsLoading(true);
        const fetchUserDetails = async () => {
        const imageName = await getCurrrentUserImageName();
        if (imageName) {
            const url = await getImageUrlByName(imageName);
            setImageSource({ uri: url });
        }

        const userDetails = await fetchUsernameAndEmail();
        if (userDetails) {
            setUsername(userDetails.username);
            setEmail(userDetails.email);
            setEditUsername(userDetails.username);
        }

        setIsLoading(false);
    };

        fetchUserDetails();
    }, []);

    const handleUploadPicture = async () => {
        setIsLoading(true);
        const imageName = await uploadPicture();
        if (imageName) {
            const url = await getImageUrlByName(imageName);
            setImageSource({ uri: url });
        }
        setIsLoading(false);
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            handleSavePress(); // Save the changes when toggling from editing to viewing
        }
    };

    const handleSavePress = async () => {
        //setIsLoading(true);
        await updateUsername(editUsername);
        setUsername(editUsername);
        setIsEditing(false);
        //setIsLoading(false);
    };

    return(
        <View style={styles.pictureContainer}>
            <View style={styles.content}>
                <Pressable style={[styles.pictureContent, {borderWidth: 3, borderColor: colors.border500}]} onLongPress={handleUploadPicture}>
                    <View style={styles.picture}>
                        {isLoading ? (
                            <ActivityIndicator size="small" color="#f4f5f7" />
                            ) : imageSource ? (
                                <Image source={imageSource} style={styles.image} />
                        ) : (
                                <Ionicons name="person" color={colors.icons100} size={55} />
                        )}
                    </View>
                </Pressable>
            </View>
            <Pressable style={styles.buttonContainer} onPress={handleUploadPicture}>
                <Entypo 
                    name="pencil"
                    size={15}
                    color={'#4c1d95'}
                />
            </Pressable>
            <View style={styles.infContainer}>
                <View style={styles.usernameEditContainer}>
                    {isEditing ? (
                        <>
                            <TextInput
                                style={[styles.textInput, {color: colors.text900}]}
                                onChangeText={setEditUsername}
                                value={editUsername}
                                autoFocus={true}
                                maxLength={20}
                            />
                            <Pressable style={styles.buttonContainerEdit} onPress={toggleEdit}>
                                <Ionicons
                                    name="save-outline"
                                    size={15}
                                    color={'#4c1d95'}
                                />
                            </Pressable>
                        </>
                    ) : (
                        <>
                            <Text style={[styles.userInfoText, {color: colors.text900}]} numberOfLines={1} ellipsizeMode="middle">{username}</Text>
                            <Pressable style={styles.buttonContainerEdit} onPress={toggleEdit}>
                                <Entypo 
                                    name="pencil"
                                    size={15}
                                    color={'#4c1d95'}
                                />
                            </Pressable>
                        </>
                    )}
                </View>
                <Text style={[styles.textInf, {color: colors.text900}]}>{email}</Text>
                <Text style={[styles.textInf, {color: colors.text900}]}>Registered groups: {}</Text>
            </View>         
        </View>
        
    );
}

const styles = StyleSheet.create({
    pictureContainer: {
        width: '100%',
        height: '100%',
        alignItems: "center",
        justifyContent: 'flex-end',
        paddingVertical: 10
    },
    content: {
        width: '100%',
        height: '30%',
        alignItems: "center",
        justifyContent: 'center',
    },
    pictureContent: {
        width: 100,
        height: 100,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        elevation: 4,
        shadowColor: "#2e1065",
        shadowRadius: 10,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: .4,
    },
    picture: {
        width: '95%',
        height: '95%',
        borderRadius: 100,
        backgroundColor: '#4c1d95',
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 5,
        borderColor: Colors.primary950,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 75,
        resizeMode: 'cover'
    },
    buttonContainer: {
        width: 30,
        height: 30,
        backgroundColor: '#c4b5fd',
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        bottom: "10%",
        left: '10%',
        borderWidth: 2,
        borderColor: Colors.primary900,
    },
    infContainer: {
        width: '100%',
        height: '35%',
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    usernameEditContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10
    },
    buttonContainerEdit: {
        width: 25,
        height: 25,
        backgroundColor: '#c4b5fd',
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#5b21b6",
    },
    textInf: {
        fontWeight: "bold",
        fontSize: 12
    },
    userInfoText: {
        fontWeight: "bold",
        fontSize: 25,
    },
    textInput: {
        textAlign: "center",
        fontSize: 25,
        padding: 5,
        borderColor: Colors.primary950,
        borderBottomWidth: 2,
    },
})