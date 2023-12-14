import { auth, db } from "./firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

export async function createGroup(title) {
  try {
    const userRef = auth.currentUser.uid;
    const group = await addDoc(collection(db, "groups"), {
      title: title,
    });
    const groupRef = group.id;
    await addMember(groupRef, userRef);
    return groupRef;
  } catch (error) {
    console.error("Error updating group document:", error.message);
    throw error;
  }
}
export async function deleteGroup(groupId) {
  try {
    const groupDocRef = doc(db, "groups", groupId);
    await deleteDoc(groupDocRef);

    const membersQuery = query(
      collection(db, "members"),
      where("group", "==", groupDocRef)
    );
    const membersSnapshot = await getDocs(membersQuery);

    const deletePromises = membersSnapshot.docs.map(async (memberDoc) => {
      await deleteDoc(memberDoc.ref);
    });

    await Promise.all(deletePromises);
  } catch (error) {
    console.error("Error deleting group and members:", error.message);
    throw error;
  }
}

export async function updateGroup(groupId, newTitle) {
  try {
    const groupDocRef = doc(db, "groups", groupId);
    await updateDoc(groupDocRef, {
      title: newTitle,
    });
  } catch (error) {
    console.error("Error updating group title:", error.message);
    throw error;
  }
}

export async function addMember(groupRef, userRef) {
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

export async function fetchGroups(callback) {
  const userRef = auth.currentUser.uid;
  const userDocRef = doc(db, "users", userRef);
  const membersCollection = collection(db, "members");

  const userMembersQuery = query(
    membersCollection,
    where("user", "==", userDocRef)
  );

  const unsubscribe = onSnapshot(userMembersQuery, (userMembersSnapshot) => {
    const groupRefs = userMembersSnapshot.docs
      .map((doc) => doc.data().group)
      .filter((groupRef) => groupRef);

    const groupIDs = groupRefs.map((groupRef) => groupRef.id);

    const groupsQuery = query(
      collection(db, "groups"),
      where("__name__", "in", groupIDs)
    );

    return onSnapshot(groupsQuery, (groupsSnapshot) => {
      const groups = groupsSnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
      }));
      callback(groups);
    });
  });

  return unsubscribe;
}
