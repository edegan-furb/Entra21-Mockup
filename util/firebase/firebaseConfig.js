import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBcP4kFfMLWiGSDRXEgHd-jZbih-ov8Tt0",
  authDomain: "authapp-97508.firebaseapp.com",
  databaseURL: "https://authapp-97508-default-rtdb.firebaseio.com",
  projectId: "authapp-97508",
  storageBucket: "authapp-97508.appspot.com",
  messagingSenderId: "569213084354",
  appId: "1:569213084354:web:abdd694eda886d255c515b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
export const db = getFirestore(app);

export default app;