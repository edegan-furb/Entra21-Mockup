import { auth, db } from "./firebaseConfig";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

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
    const memberRef = await addDoc(collection(db, "members"), {
      group: "groups/" + groupRef,
      user: "users/" + userRef,
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
    const groupsCollection = collection(db, "groups");
    const membersCollection = collection(db, "members");

    const userMembersQuery = query(
      membersCollection,
      where("user", "==", `users/${userRef}`)
    );
    const userMembersSnapshot = await getDocs(userMembersQuery);

    const groupRefs = userMembersSnapshot.docs
      .map((doc) => doc.data().group)
      .filter((groupRef) => groupRef); // Filter out undefined values

    if (groupRefs.length === 0) {
      // No groups found for the user
      return [];
    }

    const groupIDs = groupRefs.map((groupRef) =>
      typeof groupRef === "string" ? groupRef.split("/")[1] : groupRef.id
    );

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
