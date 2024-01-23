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
  getDoc,
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
    //  Add the current user as a admin to the newly created group
    addAdminToMember(groupRef, userRef, true);
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

export async function isAdmin(groupRef, userRef, callback) {
  try {
    const groupDocRef = doc(db, "groups", groupRef);
    const userDocRef = doc(db, "users", userRef);

    const q = query(
      collection(db, "members"),
      where("group", "==", groupDocRef),
      where("user", "==", userDocRef)
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        if (!querySnapshot.empty) {
          const memberData = querySnapshot.docs[0].data();
          const isAdmin = memberData.admin;
          console.log("Member admin info updated.");
          callback(isAdmin);
        } else {
          console.log("Member document not found.");
          callback(false);
        }
      },
      (error) => {
        console.error("Error listening to admin status:", error);
        throw error;
      }
    );

    return unsubscribe;
  } catch (error) {
    console.error("Error setting up admin status listener:", error.message);
    throw error;
  }
}

export async function addAdminToMember(groupRef, userRef, state) {
  try {
    const groupDocRef = doc(db, "groups", groupRef);
    const userDocRef = doc(db, "users", userRef);

    const querySnapshot = await getDocs(
      query(
        collection(db, "members"),
        where("group", "==", groupDocRef),
        where("user", "==", userDocRef)
      )
    );

    const memberDocRef = querySnapshot.docs[0].ref;

    await updateDoc(memberDocRef, {
      admin: state,
    });

    console.log("Member document updated successfully.");
  } catch (error) {
    console.error("Error updating member document:", error.message);
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

export async function removeMember(memberId) {
  try {
    // Create a reference to the member document in the Firestore
    const memberDocRef = doc(db, "members", memberId);

    // Delete the member document
    await deleteDoc(memberDocRef);

    console.log("Member removed successfully from Firestore");
  } catch (error) {
    console.error("Error removing member from Firestore:", error);
    throw error;
  }
}

export async function fetchGroups(callback) {
  const userRef = auth.currentUser.uid;
  const userDocRef = doc(db, "users", userRef);
  const membersCollection = collection(db, "members");
  const groupsCollectionRef = collection(db, "groups");

  // Listen for changes in user memberships
  const stopListeningUserMemberships = onSnapshot(
    query(membersCollection, where("user", "==", userDocRef)),
    (userMembersSnapshot) => {
      // Get the group references from the user's memberships
      const groupRefs = userMembersSnapshot.docs
        .map((doc) => doc.data().group)
        .filter(Boolean);

      if (groupRefs.length === 0) {
        callback([]);
        return;
      }

      const groupIDs = groupRefs.map((groupRef) => groupRef.id);

      // Listener for real-time updates on groups
      const groupsQuery = query(
        groupsCollectionRef,
        where("__name__", "in", groupIDs)
      );
      const stopListeningGroups = onSnapshot(groupsQuery, (groupsSnapshot) => {
        const groups = groupsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sort groups by title
        const sortedGroups = groups.sort((a, b) =>
          a.title.localeCompare(b.title)
        );

        // Callback function with the sorted groups data
        callback(sortedGroups);
      });

      // This will return the stopListening function for the groups listener
      return stopListeningGroups;
    }
  );

  // Return a function to stop both listeners
  return () => {
    stopListeningUserMemberships();
    // Call the stopListeningGroups function if it's defined
    stopListeningGroups && stopListeningGroups();
  };
}

export async function fetchGroupMembers(groupId, callback) {
  const groupDocRef = doc(db, "groups", groupId);

  const membersQuery = query(
    collection(db, "members"),
    where("group", "==", groupDocRef)
  );

  const stopListeningMembers = onSnapshot(
    membersQuery,
    async (membersSnapshot) => {
      const membersData = await Promise.all(
        membersSnapshot.docs.map(async (docSnapshot) => {
          const memberData = docSnapshot.data();
          const userDocRef = memberData.user;

          const userSnapshot = await getDoc(userDocRef);
          const userData = userSnapshot.data();

          return {
            id: docSnapshot.id,
            admin: memberData.admin,
            group: groupId,
            user: memberData.user,
            email: userData.email,
            username: userData.username,
          };
        })
      );

      const sortedMembers = membersData.sort((a, b) =>
        a.username.localeCompare(b.username)
      );

      callback(sortedMembers);
    }
  );

  return () => {
    stopListeningMembers();
  };
}

export async function updateAdminStatus(memberId) {
  try {
    const memberDocRef = doc(db, "members", memberId);

    const memberDoc = await getDoc(memberDocRef);
    if (!memberDoc.exists()) {
      throw new Error("Member document not found.");
    }

    const currentAdminStatus = memberDoc.data().admin;

    await updateDoc(memberDocRef, {
      admin: !currentAdminStatus,
    });

    console.log("Member admin status toggled successfully.");
  } catch (error) {
    console.error("Error toggling member admin status:", error.message);
    throw error;
  }
}
