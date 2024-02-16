import { db } from "../firebaseConfig";
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

// Function to set a user's admin status within a group
export async function setAdminStatus(groupRef, userRef, state) {
  try {
    // Create Firestore document references for the group and user
    const groupDocRef = doc(db, "groups", groupRef);
    const userDocRef = doc(db, "users", userRef);

    // Query to find the membership record of the user in the group
    const querySnapshot = await getDocs(
      query(
        collection(db, "members"),
        where("group", "==", groupDocRef),
        where("user", "==", userDocRef)
      )
    );

    // Retrieve the reference of the member document
    const memberDocRef = querySnapshot.docs[0].ref;

    // Update the member document with the new admin state
    await updateDoc(memberDocRef, {
      admin: state,
    });

    console.log("Member admin set successfully.");
  } catch (error) {
    console.error("Error setting member admin:", error.message);
    throw error;
  }
}

// Function to add a new member to a group
export async function addMember(groupRef, userRef) {
  try {
    // Create Firestore document references for the group and user
    const groupDocRef = doc(db, "groups", groupRef);
    const userDocRef = doc(db, "users", userRef);

    // Add a new member document to the "members" collection
    const memberRef = await addDoc(collection(db, "members"), {
      group: groupDocRef,
      user: userDocRef,
    });
    console.log("Member added successfully.");
    // return the added member document reference
    return memberRef;
  } catch (error) {
    console.error("Error updating member document:", error.message);
    throw error;
  }
}

// Function to remove a member from a group
export async function removeMember(memberId) {
  try {
    // Create a reference to the specified member document in Firestore
    const memberDocRef = doc(db, "members", memberId);

    // Delete the member document
    await deleteDoc(memberDocRef);

    console.log("Member removed successfully.");
  } catch (error) {
    console.error("Error removing member", error);
    throw error;
  }
}

// Function to fetch all group members
export async function fetchGroupMembers(groupId, callback) {
  // Create a reference to the specified group in Firestore
  const groupDocRef = doc(db, "groups", groupId);

  // Define a query for members of the specified group
  const membersQuery = query(
    collection(db, "members"),
    where("group", "==", groupDocRef)
  );

  // Set up a real-time listener for changes in group members
  const stopListeningMembers = onSnapshot(
    membersQuery,
    async (membersSnapshot) => {
      // Process each member document
      const membersData = await Promise.all(
        membersSnapshot.docs.map(async (docSnapshot) => {
          const memberData = docSnapshot.data();
          const userDocRef = memberData.user;

          // Fetch user data for each member
          const userSnapshot = await getDoc(userDocRef);
          const userData = userSnapshot.data();

          // Combine member and user data
          return {
            id: docSnapshot.id,
            admin: memberData.admin,
            group: groupId,
            user: memberData.user.id,
            email: userData.email,
            username: userData.username,
          };
        })
      );

      // Sort members alphabetically by username
      const sortedMembers = membersData.sort((a, b) =>
        a.username.localeCompare(b.username)
      );

      // Invoke the callback with the sorted member list
      callback(sortedMembers);
    }
  );

  // Return a function that stops listening to member updates
  return () => {
    stopListeningMembers();
  };
}

// Function to update a user's admin status within a group
export async function updateAdminStatus(memberId) {
  try {
    // Create a reference to the member document in Firestore
    const memberDocRef = doc(db, "members", memberId);

    // Fetch the member document
    const memberDoc = await getDoc(memberDocRef);
    if (!memberDoc.exists()) {
      throw new Error("Member document not found.");
    }

    // Toggle the admin status of the member
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
