import { auth, db } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

// Function to update an existing user.
export async function updateUsername(newUsername) {
  try {
    const userId = auth.currentUser.uid;
    // Create a reference to the specified user document
    const userDocRef = doc(db, "users", userId);

    // Update the group's title
    await updateDoc(userDocRef, {
      username: newUsername,
    });
    console.log("Username updated successfully.");
  } catch (error) {
    console.error("Error updating Username:", error.message);
    throw error;
  }
}

// Function to fetch username and email of the current user
export async function fetchUsernameAndEmail() {
  try {
    const userId = auth.currentUser.uid;
    const userDocRef = doc(db, "users", userId);

    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      return { username: userData.username, email: userData.email };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    throw error;
  }
}

// Function to fetch user's email based on their username.
export async function getEmailByUsername(username) {
  try {
    // Create a query to find a user document with the specified username
    const usersQuery = query(
      collection(db, "users"),
      where("username", "==", username)
    );

    // Execute the query and retrieve the snapshot
    const querySnapshot = await getDocs(usersQuery);

    // If no user is found, return null
    if (querySnapshot.empty) {
      console.log("No user found with the specified username.");
      return null;
    }

    // Retrieve the email from the first document in the snapshot
    const userDoc = querySnapshot.docs[0];
    const userEmail = userDoc.data().email;

    console.log("Email retrieved successfully:", userEmail);
    return userEmail;
  } catch (error) {
    console.error("Error retrieving email by username:", error.message);
    throw error;
  }
}

// Function to retrieve a user's ID based on their email
export async function getUserIdByEmail(email) {
  try {
    // Create a query to find a user document with the specified email
    const usersQuery = query(
      collection(db, "users"),
      where("email", "==", email)
    );

    // Execute the query and retrieve the snapshot
    const querySnapshot = await getDocs(usersQuery);

    // If no user is found, return null
    if (querySnapshot.empty) {
      console.log("No user found with the specified email.");
      return null;
    }

    // Retrieve the user ID from the first document in the snapshot
    const userDoc = querySnapshot.docs[0];
    const userId = userDoc.id;

    console.log("User ID retrieved successfully.");
    return userId;
  } catch (error) {
    console.error("Error retrieving user ID by email:", error.message);
    throw error;
  }
}


export async function deleteAccount() {
  try {
    const user = auth.currentUser;
    const userId = user.uid;
    const userDocRef = doc(db, "users", userId);

    if (userId) {
      // Delete the user's specific document in the "users" collection
      await deleteDoc(userDocRef);

      // Find and delete all documents in the "members" collection where `user` equals `userId`
      const membersQuery = query(collection(db, 'members'), where('user', '==', userDocRef));
      const querySnapshot = await getDocs(membersQuery);

      // Delete each document found in the query
      for (const document of querySnapshot.docs) {
        await deleteDoc(document.ref);
      }

      // Delete the user's authentication account
      await user.delete();
      console.log('User account and all related documents deleted successfully');
    }
  } catch (error) {
    console.error("Error deleting account:", error.message);
    throw error;
  }
}