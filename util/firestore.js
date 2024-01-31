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
  setDoc,
} from "firebase/firestore";

// Function to create a new group in the Firestore database
export async function createGroup(title) {
  try {
    // Retrieve the UID of the currently authenticated user
    const userRef = auth.currentUser.uid;

    // Add a new document to the "groups" collection with the given title
    const group = await addDoc(collection(db, "groups"), {
      title: title,
    });

    // Retrieve the generated document ID of the new group
    const groupRef = group.id;

    // Add the current user as a member of the newly created group
    await addMember(groupRef, userRef);

    // Assign the current user as an admin of the newly created group
    setAdminStatus(groupRef, userRef, true);

    console.log("Group created successfully.");

    // return the new group's ID
    return groupRef;
  } catch (error) {
    console.error("Error updating group document:", error.message);
    throw error;
  }
}

// Function to delete a group and its associated members from the Firestore database.
export async function deleteGroup(groupId) {
  try {
    // Create a reference to the specified group document
    const groupDocRef = doc(db, "groups", groupId);

    // Delete the group document
    await deleteDoc(groupDocRef);

    // Construct a query to find all members associated with the group
    const membersQuery = query(
      collection(db, "members"),
      where("group", "==", groupDocRef)
    );

    // Execute the query and get a snapshot of the resulting documents
    const membersSnapshot = await getDocs(membersQuery);

    // Map over the member documents, deleting each one
    const deletePromises = membersSnapshot.docs.map(async (memberDoc) => {
      await deleteDoc(memberDoc.ref);
    });

    // Wait for all member deletion promises to resolve
    await Promise.all(deletePromises);
    console.log("Group and members deleted successfully.");
  } catch (error) {
    console.error("Error deleting group and members:", error.message);
    throw error;
  }
}

// Function to update an existing group.
export async function updateGroup(groupId, newTitle) {
  try {
    // Create a reference to the specified group document
    const groupDocRef = doc(db, "groups", groupId);

    // Update the group's title
    await updateDoc(groupDocRef, {
      title: newTitle,
    });
    console.log("Group updated successfully.");
  } catch (error) {
    console.error("Error updating group title:", error.message);
    throw error;
  }
}

export async function isMember(groupId, userId) {
  try {
    // Create references to the user and group documents
    const userRef = doc(db, "users", userId);
    const groupRef = doc(db, "groups", groupId);

    // Query the 'members' collection for documents matching both userId and groupId
    const membershipQuery = query(
      collection(db, "members"),
      where("user", "==", userRef),
      where("group", "==", groupRef)
    );

    // Execute the query
    const querySnapshot = await getDocs(membershipQuery);

    // Check if any documents were returned
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking membership:", error.message);
    throw error;
  }
}

// Function to check if a user is an admin of a given group.
export async function isAdmin(groupRef, userRef, callback) {
  try {
    // Create references to the specified group and user documents
    const groupDocRef = doc(db, "groups", groupRef);
    const userDocRef = doc(db, "users", userRef);

    // Construct a query to find the membership document for the user in the group
    const q = query(
      collection(db, "members"),
      where("group", "==", groupDocRef),
      where("user", "==", userDocRef)
    );

    // Set up a real-time listener on the query
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        if (!querySnapshot.empty) {
          // Extract admin status from the first (and only) document in the snapshot
          const memberData = querySnapshot.docs[0].data();
          const isAdmin = memberData.admin;
          console.log("Member admin info updated.");
          callback(isAdmin);
        } else {
          // Handle case where the member document is not found
          console.log("Member document not found.");
          callback(false);
        }
      },
      (error) => {
        console.error("Error listening to admin status:", error);
        throw error;
      }
    );

    // Return the unsubscribe function to allow caller to stop listening
    return unsubscribe;
  } catch (error) {
    console.error("Error setting up admin status listener:", error.message);
    throw error;
  }
}
// Function to retrieve a user's ID based on their email
export async function getUserIdByEmail(email) {
  try {
    // Create a query to find a user document with the specified email
    const usersQuery = query(
      collection(db, "users"),
      where("email", "==", email)
    );

    // Execute the query and retrieve the snapshot
    const querySnapshot = await getDocs(usersQuery);

    // If no user is found, return null
    if (querySnapshot.empty) {
      console.log("No user found with the specified email.");
      return null;
    }

    // Retrieve the user ID from the first document in the snapshot
    const userDoc = querySnapshot.docs[0];
    const userId = userDoc.id;

    console.log("User ID retrieved successfully.");
    return userId;
  } catch (error) {
    console.error("Error retrieving user ID by email:", error.message);
    throw error;
  }
}

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

// Function to fetch all groups a user is a member of
export async function fetchGroups(callback) {
  // Get the UID of the current authenticated user
  const userRef = auth.currentUser.uid;
  // Create a Firestore document reference for the user
  const userDocRef = doc(db, "users", userRef);
  // Define references to the "members" and "groups" collections
  const membersCollection = collection(db, "members");
  const groupsCollectionRef = collection(db, "groups");

  // Set up a listener for changes in the user's memberships
  const stopListeningUserMemberships = onSnapshot(
    query(membersCollection, where("user", "==", userDocRef)),
    (userMembersSnapshot) => {
      // Extract group references from the user's memberships
      const groupRefs = userMembersSnapshot.docs
        .map((doc) => doc.data().group)
        .filter(Boolean);

      // If the user is not a member of any groups, invoke the callback with an empty array
      if (groupRefs.length === 0) {
        callback([]);
        return;
      }

      // Extract group IDs from the group references
      const groupIDs = groupRefs.map((groupRef) => groupRef.id);

      // Define a query for the groups the user is a member of
      const groupsQuery = query(
        groupsCollectionRef,
        where("__name__", "in", groupIDs)
      );

      // Set up a real-time listener for changes in these groups
      const stopListeningGroups = onSnapshot(groupsQuery, (groupsSnapshot) => {
        // Map Firestore documents to a JavaScript object
        const groups = groupsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sort the groups alphabetically by their title
        const sortedGroups = groups.sort((a, b) =>
          a.title.localeCompare(b.title)
        );

        // Invoke the callback with the sorted groups
        callback(sortedGroups);
      });

      // Return a function to stop listening for group updates
      return stopListeningGroups;
    }
  );

  // Return a function that stops listening to both user memberships and group updates
  return () => {
    stopListeningUserMemberships();
    // Call the stopListeningGroups function if it's defined
    stopListeningGroups && stopListeningGroups();
  };
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
            user: memberData.user,
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

// Function to create a new task to a group
export async function createtask(groupId, taskData) {
  try {
    // Create a reference to the specified group in Firestore
    const group = doc(db, "groups", groupId);
    // Retrieve the UID of the currently authenticated user
    const userRef = auth.currentUser.uid;
    // Create a Firestore document reference for the owner
    const owner = doc(db, "users", userRef);
    // Create a Firestore document reference for the designatedUser
    const designatedUser = doc(db, "users", taskData.designatedUser);

    // Destructure the task data
    const { title, description, date, objectives, completed } = taskData;

    // // Initial completed status of the task
    // const completed = false;

    // Create a new task in the 'tasks' collection
    const taskRef = await addDoc(collection(db, "tasks"), {
      completed,
      title,
      description,
      date,
      designatedUser,
      group,
      owner,
    });

    // Create objectives as sub-documents of the task
    const objectivesPromises = objectives.map((objective) =>
      setDoc(doc(db, `tasks/${taskRef.id}/objectives`, objective.id), {
        value: objective.value,
        completed: objective.completed,
      })
    );

    // Wait for all objectives to be added
    await Promise.all(objectivesPromises);

    return taskRef.id;
  } catch (error) {
    console.error("Error creating task:", error.message);
    throw error;
  }
}

// export async function fetchGroupTasks(groupId, callback) {
//   // Create a reference to the specified group in Firestore
//   const groupDocRef = doc(db, "groups", groupId);

//   // Define a query for tasks of the specified group
//   const tasksQuery = query(
//     collection(db, "tasks"),
//     where("group", "==", groupDocRef)
//   );

//   // Set up a real-time listener for changes in group tasks
//   const stopListeningTasks = onSnapshot(tasksQuery, async (tasksSnapshot) => {
//     // Process each task document
//     const tasksData = await Promise.all(
//       tasksSnapshot.docs.map(async (docSnapshot) => {
//         const taskData = docSnapshot.data();

//         // Fetch the designated user's email
//         let designatedUserEmail = "";
//         if (taskData.designatedUser) {
//           const userDocSnapshot = await getDoc(taskData.designatedUser);
//           if (userDocSnapshot.exists()) {
//             const userData = userDocSnapshot.data();
//             designatedUserEmail = userData.email; // Assuming the field is named 'email'
//           }
//         }

//         // Fetch objectives for this task
//         const objectivesRef = collection(
//           db,
//           `tasks/${docSnapshot.id}/objectives`
//         );
//         const objectivesSnapshot = await getDocs(objectivesRef);
//         const objectives = objectivesSnapshot.docs.map((doc) => doc.data());
//         // Return task data with objectives and designated user email
//         return {
//           id: docSnapshot.id,
//           title: taskData.title,
//           description: taskData.description,
//           date: taskData.date.toDate(), // Converting Firestore Timestamp to JavaScript Date
//           completed: taskData.completed,
//           owner: taskData.owner,
//           designatedUser: designatedUserEmail, // Updated to include the user's email
//           group: groupId,
//           objectives, // Added objectives array
//         };
//       })
//     );

//     // Invoke the callback with the tasks dat
//     callback(tasksData);
//   });

//   // Return a function that stops listening to tasks updates
//   return () => {
//     stopListeningTasks();
//   };
// }

export async function fetchGroupTasks(groupId, callback) {
  // Create a reference to the specified group in Firestore
  const groupDocRef = doc(db, "groups", groupId);

  // Define a query for tasks of the specified group
  const tasksQuery = query(
    collection(db, "tasks"),
    where("group", "==", groupDocRef)
  );

  // Initialize an object to keep track of listeners for objectives
  const objectivesListeners = {};

  // Set up a real-time listener for changes in group tasks
  const stopListeningTasks = onSnapshot(tasksQuery, async (tasksSnapshot) => {
    // Process each task document
    const tasksData = await Promise.all(
      tasksSnapshot.docs.map(async (docSnapshot) => {
        const taskData = docSnapshot.data();
        const taskId = docSnapshot.id;

        // Fetch the designated user's email
        let designatedUserEmail = "";
        if (taskData.designatedUser) {
          const userDocSnapshot = await getDoc(taskData.designatedUser);
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            designatedUserEmail = userData.email; // Assuming the field is named 'email'
          }
        }

        // Listen to objectives for this task
        // if (!objectivesListeners[taskId]) {
        const objectivesRef = collection(db, `tasks/${taskId}/objectives`);
        objectivesListeners[taskId] = onSnapshot(
          objectivesRef,
          (objectivesSnapshot) => {
            const objectives = objectivesSnapshot.docs.map((doc) => {
              // Extracting specific fields from each objective document
              const objectiveData = doc.data();
              return {
                id: doc.id, // Include the document ID
                value: objectiveData.value, // Include the 'value' field
                completed: objectiveData.completed, // Include the 'completed' field
                // Add any additional fields or transformations as needed
              };
            });

            // Update the task in tasksData and invoke the callback
            const updatedTask = tasksData.find((t) => t.id === taskId);
            if (updatedTask) {
              updatedTask.objectives = objectives;
              callback(tasksData);
            }
          }
        );
        //}

        // Return initial task data
        return {
          id: taskId,
          title: taskData.title,
          description: taskData.description,
          date: taskData.date.toDate(), // Converting Firestore Timestamp to JavaScript Date
          completed: taskData.completed,
          owner: taskData.owner,
          designatedUser: designatedUserEmail, // Updated to include the user's email
          group: groupId,
          objectives: [], // Initialize with empty array
        };
      })
    );

    // Invoke the callback with the initial tasks data
    callback(tasksData);
  });

  // Return a function that stops listening to all updates
  return () => {
    stopListeningTasks();
    // Stop listening to all objectives listeners
    Object.values(objectivesListeners).forEach((stopListener) =>
      stopListener()
    );
  };
}

export async function updateTask(taskId, updatedTaskData) {
  try {
    // Create a reference to the specified task document
    const taskDocRef = doc(db, "tasks", taskId);

    // Destructure the updated task data to separate objectives and designatedUser
    const { objectives, designatedUser, ...taskDataWithoutObjectives } =
      updatedTaskData;

    // Convert designatedUser ID to a Firestore reference
    let userRef = null;
    if (designatedUser) {
      userRef = doc(db, "users", designatedUser);
    }

    // Combine task data with the user reference
    const taskDataToUpdate = {
      ...taskDataWithoutObjectives,
      ...(userRef ? { designatedUser: userRef } : {}),
    };

    // Update the task with the new data, excluding objectives
    await updateDoc(taskDocRef, taskDataToUpdate);

    // Reference to the objectives subcollection
    const objectivesRef = collection(db, `tasks/${taskId}/objectives`);

    const updateObjectivesPromises = objectives.map((objective) => {
      const objectiveDocRef = doc(objectivesRef, objective.id);
      return updateDoc(objectiveDocRef, {
        value: objective.value,
        completed: objective.completed,
      });
    });

    // Wait for all objectives to be updated
    await Promise.all(updateObjectivesPromises);

    console.log("Task updated and objectives replaced successfully.");
  } catch (error) {
    console.error(
      "Error updating task and replacing objectives:",
      error.message
    );
    throw error;
  }
}
