import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

export async function docGroup(title) {
  try {
    const groupRef = await addDoc(collection(db, "groups"), {
      title: title,
    });
    return groupRef;
  } catch (error) {
    console.error("Error updating group document:", error.message);
    throw error;
  }
}

export async function fetchGroups() {
  try {
    const groupsCollection = collection(db, "groups");

    const querySnapshot = await getDocs(groupsCollection);

    const groups = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title,
    }));

    return groups;
  } catch (error) {
    console.error("Error fetching groups:", error.message);
    throw error;
  }
}
