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
    //  Get the UID of the current user
    const userRef = auth.currentUser.uid;

    //  Add a new group document to the "groups" collection
    const group = await addDoc(collection(db, "groups"), {
      title: title,
    });

    //  Retrieve the ID of the created group
    const groupRef = group.id;
    //  Add the current user as a member to the newly created group
    await addMember(groupRef, userRef);
    //  Return the ID of the created group
    return groupRef;
  } catch (error) {
    console.error("Error updating group document:", error.message);
    throw error;
  }
}

export async function deleteGroup(groupId) {
  try {
    //  Create Firestore document reference for the group
    const groupDocRef = doc(db, "groups", groupId);

    //  Delete the group document
    await deleteDoc(groupDocRef);

    //  Query to find members associated with the group
    const membersQuery = query(
      collection(db, "members"),
      where("group", "==", groupDocRef)
    );

    //  Fetch members associated with the group
    const membersSnapshot = await getDocs(membersQuery);

    //  Delete each member document associated with the group
    const deletePromises = membersSnapshot.docs.map(async (memberDoc) => {
      await deleteDoc(memberDoc.ref);
    });

    //  Wait for all member deletions to complete
    await Promise.all(deletePromises);
  } catch (error) {
    console.error("Error deleting group and members:", error.message);
    throw error;
  }
}

export async function updateGroup(groupId, newTitle) {
  try {
    // Create Firestore document reference for the group
    const groupDocRef = doc(db, "groups", groupId);

    //  Update the group document with the new title
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
    //  Create Firestore document references for the group and user
    const groupDocRef = doc(db, "groups", groupRef);
    const userDocRef = doc(db, "users", userRef);

    //  Add a new member document to the "members" collection
    const memberRef = await addDoc(collection(db, "members"), {
      group: groupDocRef,
      user: userDocRef,
    });
    //  Return the added member document reference
    return memberRef;
  } catch (error) {
    console.error("Error updating member document:", error.message);
    throw error;
  }
}

export async function fetchGroups(callback) {
  //  Get the current user's UID
  const userRef = auth.currentUser.uid;
  //  Reference to the user document in Firestore
  const userDocRef = doc(db, "users", userRef);
  //  Collection reference for the "members" collection in Firestore
  const membersCollection = collection(db, "members");

  //  Get user memberships based on the user document reference
  const userMembersQuery = query(
    membersCollection,
    where("user", "==", userDocRef)
  );

  //  Variable to store the stopListening function
  let stopListening;

  //  Listener for real-time updates on user memberships
  onSnapshot(userMembersQuery, (userMembersSnapshot) => {
    //  Extract group references from user memberships
    const groupRefs = userMembersSnapshot.docs
      .map((doc) => doc.data().group)
      .filter((groupRef) => groupRef);

    //  If there are no group references, return early
    if (groupRefs.length === 0) {
      return;
    }

    //  Extract group IDs from group references
    const groupIDs = groupRefs.map((groupRef) => groupRef.id);

    //  Fetch groups from Firestore based on group IDs
    const groupsQuery = query(
      collection(db, "groups"),
      where("__name__", "in", groupIDs)
    );

    //  Listener for real-time updates on groups
    stopListening = onSnapshot(groupsQuery, (groupsSnapshot) => {
      //  Extract and map group data from the snapshot
      const groups = groupsSnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
      }));
      //  Callback function with the fetched groups data
      callback(groups);
    });
  });

  //  Return the stopListening function or an empty function if undefined
  return stopListening || (() => {});
}
