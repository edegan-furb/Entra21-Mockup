import { auth, db } from "./firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  getDoc,
  doc,
} from "firebase/firestore";

export async function docGroup(title) {
  try {
    const userRef = auth.currentUser.uid;
    const group = await addDoc(collection(db, "groups"), {
      title: title,
    });
    const groupRef = group.id;
    await docMember(groupRef, userRef);
    return groupRef;
  } catch (error) {
    console.error("Error updating group document:", error.message);
    throw error;
  }
}

export async function docMember(groupRef, userRef) {
  try {
    const groupDocRef = doc(db, "groups", groupRef);
    const userDocRef = doc(db, "users", userRef);
    const memberRef = await addDoc(collection(db, "members"), {
      group: groupDocRef,
      user: userDocRef,
    });
    return memberRef;
  } catch (error) {
    console.error("Error updating member document:", error.message);
    throw error;
  }
}

export async function fetchGroups() {
  try {
    const userRef = auth.currentUser.uid;
    const userDocRef = doc(db, "users", userRef);
    const groupsCollection = collection(db, "groups");
    const membersCollection = collection(db, "members");

    const userMembersQuery = query(
      membersCollection,
      where("user", "==", userDocRef)
    );
    const userMembersSnapshot = await getDocs(userMembersQuery);

    const groupRefs = userMembersSnapshot.docs
      .map((doc) => doc.data().group)
      .filter((groupRef) => groupRef);

    if (groupRefs.length === 0) {
      return [];
    }

    const groupIDs = groupRefs.map((groupRef) => groupRef.id);

    const groupsQuery = query(
      groupsCollection,
      where("__name__", "in", groupIDs)
    );
    const groupsSnapshot = await getDocs(groupsQuery);

    const groups = groupsSnapshot.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title,
    }));

    return groups;
  } catch (error) {
    console.error("Error fetching groups:", error.message);
    throw error;
  }
}
