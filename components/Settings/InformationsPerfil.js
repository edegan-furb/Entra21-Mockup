import { View, Text, StyleSheet, Pressable, ActivityIndicator, Image, SafeAreaView, TextInput} from "react-native";
import { Ionicons, Entypo } from '@expo/vector-icons';
import { Colors } from "../../constants/styles";
import React, { useState, useEffect } from "react";
import {
    uploadPicture,
    getImageUrlByName,
    getCurrrentUserImageName,
} from "../../util/storage";
import { fetchUsernameAndEmail, updateUsername } from "../../util/firestore";

export default function ModalInformationsPerfil() {

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
        <SafeAreaView style={styles.pictureContainer}>
            <View style={styles.content}>
                <View style={styles.pictureContent}>
                    <View style={styles.picture}>
                        {isLoading ? (
                            <ActivityIndicator size="small" color="#f4f5f7" />
                            ) : imageSource ? (
                                <Image source={imageSource} style={styles.image} />
                        ) : (
                                <Ionicons name="person" color={Colors.primary100} size={55} />
                        )}
                    </View>
                </View>
            </View>
            <Pressable style={styles.buttonContainer} onPress={handleUploadPicture}>
                <Entypo 
                    name="pencil"
                    size={15}
                    color={Colors.primary900}
                />
            </Pressable>
            <View style={styles.infContainer}>
                <View style={styles.usernameEditContainer}>
                    {isEditing ? (
                        <>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={setEditUsername}
                                value={editUsername}
                                autoFocus={true}
                                maxLength={20}
                            />
                            <Pressable style={styles.buttonContainerEdit} onPress={toggleEdit}>
                                <Ionicons
                                    name="save-outline"
                                    size={15}
                                    color={Colors.primary900}
                                />
                            </Pressable>
                        </>
                    ) : (
                        <>
                            <Text style={styles.userInfoText}>{username}</Text>
                            <Pressable style={styles.buttonContainerEdit} onPress={toggleEdit}>
                                <Entypo 
                                    name="pencil"
                                    size={15}
                                    color={Colors.primary900}
                                />
                            </Pressable>
                        </>
                    )}
                </View>
                <Text style={styles.textInf}>{email}</Text>
                <Text style={styles.textInf}>Registered groups: {}</Text>
            </View>         
        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    pictureContainer: {
        width: '100%',
        height: '100%',
        alignItems: "center",
        justifyContent: 'flex-end',
        borderColor: Colors.primary950,
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
        borderWidth: 3,
        borderColor: Colors.primary950,
        alignItems: "center",
        justifyContent: "center",
        elevation: 4,
        shadowColor: Colors.primary950,
        shadowRadius: 10,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: .4,
    },
    picture: {
        width: '95%',
        height: '95%',
        borderRadius: 100,
        backgroundColor: Colors.primary900,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 5,
        borderColor: Colors.primary950,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 75,
        resizeMode: "cover",
    },
    buttonContainer: {
        width: 30,
        height: 30,
        backgroundColor: Colors.primary300,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        bottom: "10%",
        left: '10%',
        borderWidth: 2,
        borderColor: Colors.primary950,
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
        backgroundColor: Colors.primary300,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: Colors.primary950,
    },
    textInf: {
        fontWeight: "bold",
        color: Colors.primary950,
        fontSize: 12
    },
    userInfoText: {
        fontWeight: "bold",
        color: Colors.primary950,
        fontSize: 25
    },
    textInput: {
        textAlign: "center",
        fontSize: 25,
        padding: 5,
        color: Colors.primary900,
        borderColor: Colors.primary950,
        borderBottomWidth: 2,
    },
})