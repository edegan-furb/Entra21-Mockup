import app from "./firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "./firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export const auth = getAuth(app);

async function setUser(userUid, email, username) {
  try {
    //  Set user document in Firestore
    await setDoc(doc(db, "users", userUid), {
      email: email,
      username: username,
    });
  } catch (error) {
    console.error("Error updating user document:", error.message);
    throw error;
  }
}

async function authenticate(mode, email, password) {
  try {
    if (mode === "signUp") {
      //  Sign up the user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      //  Extract username from email
      const username = email.split("@")[0];

      //  Update the user's display name in the authentication profile
      await updateProfile(auth.currentUser, {
        displayName: username,
      });

      //  Get the user's ID token and UID
      const token = await userCredential.user.getIdToken();
      const userUid = userCredential.user.uid;

      // Set the user document in Firestore
      await setUser(userUid, email, username);
      //  Return the user's ID token
      return token;
    } else if (mode === "signInWithPassword") {
      //  Sign in the user with email and password
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      //  Get the user's ID token
      const token = await userCredential.user.getIdToken();
      //  Return the user's ID token
      return token;
    } else {
      throw new Error("Invalid authentication mode");
    }
  } catch (error) {
    console.error("Authentication Error:", error.message);
    throw error;
  }
}

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}
