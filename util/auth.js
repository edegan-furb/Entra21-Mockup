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

async function docUser(userUid, email, username) {
  try {
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const username = email.split("@")[0];

      await updateProfile(auth.currentUser, {
        displayName: username,
      });

      const token = await userCredential.user.getIdToken();
      const userUid = userCredential.user.uid;

      await docUser(userUid, email, username);
      return token;
    } else if (mode === "signInWithPassword") {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const token = await userCredential.user.getIdToken();
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
