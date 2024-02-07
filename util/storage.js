// Import Firebase and Expo Image Picker functions
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import app from "./firebaseConfig";

// Initialize Firebase services
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

// Request Media Library Permissions
async function requestMediaLibraryPermissions() {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
        alert("You've refused to allow this app to access your photos!");
        return false;
    }
    return true;
}

// Pick Image from Library
async function pickImageFromLibrary() {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
    });

    if (pickerResult.canceled) {
        console.log('User canceled image picker');
        return null;
    }

    return pickerResult.assets ? pickerResult.assets[0] : null;
}

// Delete Existing Image
async function deleteExistingImage(currentUser) {
    const userDocRef = doc(db, "users", currentUser.uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists() && userDoc.data().imageName) {
        const existingFileName = userDoc.data().imageName;
        const existingFileRef = ref(storage, `images/${existingFileName}`);
        await deleteObject(existingFileRef).catch(error => console.error("Failed to delete existing image", error));
    }
}

// Upload Image to Storage
async function uploadImageToStorage(image, currentUser) {
    const sourceUri = image.uri;
    const fileName = sourceUri.split('/').pop();
    const storageRef = ref(storage, `images/${fileName}`);
    const response = await fetch(sourceUri);
    const blob = await response.blob();
    await uploadBytes(storageRef, blob);
    console.log('Uploaded a blob or file!');

    // Update Firestore
    await updateFirestoreDocument(currentUser.uid, fileName);
    return fileName;
}

// Update Firestore Document
async function updateFirestoreDocument(userId, fileName) {
    const userDocRef = doc(db, "users", userId);
    await setDoc(userDocRef, { imageName: fileName }, { merge: true });
}

// Get Image URL by Name
export async function getImageUrlByName(imageName) {
    const storageRef = ref(storage, `images/${imageName}`);
    try {
        const url = await getDownloadURL(storageRef);
        return url;
    } catch (error) {
        console.error("Failed to get image URL:", error);
        return null;
    }
}

// Main function to handle the upload process
export async function uploadPicture() {
    const currentUser = auth.currentUser;
    if (!currentUser) {
        alert("No user logged in");
        return null;
    }

    if (!(await requestMediaLibraryPermissions())) return null;

    const selectedImage = await pickImageFromLibrary();
    if (!selectedImage) return null;

    await deleteExistingImage(currentUser);
    return await uploadImageToStorage(selectedImage, currentUser);
}

export async function getCurrrentUserImageName() {
    const currentUser = auth.currentUser;
    if (!currentUser) {
        console.log("No user logged in");
        return null;
    }

    const userDocRef = doc(db, "users", currentUser.uid);
    try {
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
            const userData = docSnap.data();
            return userData.imageName; // Assuming the field containing the image name is called 'imageName'
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching user image name:", error);
        return null;
    }
}

export async function getUserImageName(userId) {
    if (!userId) {
        console.log("No user ID provided");
        return null;
    }

    const userDocRef = doc(db, "users", userId);
    try {
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
            const userData = docSnap.data();
            // Use a conditional operation to return null if imageName is undefined
            return userData.imageName || null;
        } else {
            console.log("No such document for the provided user ID!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching user image name by ID:", error);
        return null;
    }
}
