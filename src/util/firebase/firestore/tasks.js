import { auth, db } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
  getDoc,
  setDoc,
} from "firebase/firestore";

// Function to create a new task to a group
export async function createtask(groupId, taskData, taskId) {
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

    const taskRef = doc(db, "tasks", taskId);

    await setDoc(taskRef, {
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

// Function to fetch all tasks given a group.
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

  // Use a map for tasksData for efficient updates
  const tasksData = new Map();

  // Set up a real-time listener for changes in group tasks
  const stopListeningTasks = onSnapshot(tasksQuery, async (tasksSnapshot) => {
    // First, remove any tasks that have been deleted
    const snapshotTaskIds = tasksSnapshot.docs.map((doc) => doc.id);
    tasksData.forEach((_, taskId) => {
      if (!snapshotTaskIds.includes(taskId)) {
        tasksData.delete(taskId);
        // Also stop listening to objectives for this task if there's a listener
        if (objectivesListeners[taskId]) {
          objectivesListeners[taskId]();
          delete objectivesListeners[taskId];
        }
      }
    });

    // Process each task document
    await Promise.all(
      tasksSnapshot.docs.map(async (docSnapshot) => {
        const taskData = docSnapshot.data();
        const taskId = docSnapshot.id;

        // Fetch the designated user's username
        let designatedUserUsername = "";
        if (taskData.designatedUser) {
          const userDocSnapshot = await getDoc(taskData.designatedUser);
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            designatedUserUsername = userData.username; // Assuming the field is named 'email'
          }
        }

        // Initialize or update tasksData map
        const existingTask = tasksData.get(taskId) || {};
        tasksData.set(taskId, {
          ...existingTask,
          id: taskId,
          title: taskData.title,
          description: taskData.description,
          date: taskData.date.toDate(), // Converting Firestore Timestamp to JavaScript Date
          completed: taskData.completed,
          owner: taskData.owner,
          designatedUser: designatedUserUsername, // Updated to include the user's username
          group: groupId,
          objectives: existingTask.objectives || [], // Preserve existing objectives if already fetched
        });

        // Immediately fetch and listen to objectives for this task
        const objectivesRef = collection(db, `tasks/${taskId}/objectives`);
        if (!objectivesListeners[taskId]) {
          objectivesListeners[taskId] = onSnapshot(
            objectivesRef,
            (objectivesSnapshot) => {
              const objectives = objectivesSnapshot.docs.map((doc) => ({
                id: doc.id,
                value: doc.data().value,
                completed: doc.data().completed,
              }));

              // Calculate the length of the objectives array
              const objectivesLength = objectives.length;

              // Update the task's objectives and invoke the callback
              const updatedTask = tasksData.get(taskId);
              if (updatedTask) {
                updatedTask.objectives = objectives;
                updatedTask.objectivesLength = objectivesLength;
                tasksData.set(taskId, updatedTask); // Ensure the map is updated
                callback(Array.from(tasksData.values())); // Convert Map values to an array
              }
            },
            (error) => {
              console.error(
                `Error fetching objectives for task ${taskId}:`,
                error
              );
            }
          );
        }
      })
    );

    // Invoke the callback after processing all tasks and their objectives
    callback(Array.from(tasksData.values()));
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

// Function to update task and its objectives.
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

    // Retrieve all existing objectives
    const existingObjectivesSnap = await getDocs(objectivesRef);
    const existingObjectives = existingObjectivesSnap.docs.map((doc) => doc.id);

    // Identify objectives to delete
    const objectivesToDelete = existingObjectives.filter(
      (id) => !objectives.some((objective) => objective.id === id)
    );

    // Delete objectives not in the updated list
    const deleteObjectivesPromises = objectivesToDelete.map((id) => {
      const objectiveDocRef = doc(objectivesRef, id);
      return deleteDoc(objectiveDocRef);
    });

    // Update and create new objectives as per the updatedTaskData
    const updateObjectivesPromises = objectives.map(async (objective) => {
      const objectiveDocRef = doc(objectivesRef, objective.id);
      const objectiveDocSnap = await getDoc(objectiveDocRef);

      if (objectiveDocSnap.exists()) {
        // Update the existing objective
        return updateDoc(objectiveDocRef, {
          value: objective.value,
          completed: objective.completed,
        });
      } else {
        // Create a new objective if it does not exist
        return setDoc(objectiveDocRef, {
          value: objective.value,
          completed: objective.completed,
        });
      }
    });

    // Wait for all deletions, updates, and creations to complete
    await Promise.all([
      ...deleteObjectivesPromises,
      ...updateObjectivesPromises,
    ]);

    console.log(
      "Task updated, objectives replaced or created, and unused objectives removed successfully."
    );
  } catch (error) {
    console.error(
      "Error updating task, replacing or creating objectives, and removing unused ones:",
      error.message
    );
    throw error;
  }
}

// Function to update objective status.
export async function updateObjectiveStatus(taskId, objectiveId) {
  try {
    // Reference to the specific objective in Firestore
    const objectiveRef = doc(db, `tasks/${taskId}/objectives`, objectiveId);

    // Get the current objective document
    const objectiveSnapshot = await getDoc(objectiveRef);

    if (!objectiveSnapshot.exists()) {
      throw new Error("Objective not found");
    }

    // Get the current completed status
    const currentStatus = objectiveSnapshot.data().completed;

    // Toggle the status
    const updatedStatus = !currentStatus;

    // Update the objective with the new status
    await updateDoc(objectiveRef, { completed: updatedStatus });

    console.log(`Objective status toggled to ${updatedStatus}`);
  } catch (error) {
    console.error("Error toggling objective status:", error);
    throw error;
  }
}

// Function to update task status.
export async function updateTaskStatus(taskId) {
  try {
    // Reference to the specific task in Firestore
    const taskRef = doc(db, "tasks", taskId);

    // Get the current task document
    const taskSnapshot = await getDoc(taskRef);

    if (!taskSnapshot.exists()) {
      throw new Error("Task not found");
    }

    // Get the current completed status of the task
    const currentStatus = taskSnapshot.data().completed;

    // Toggle the status0
    const updatedStatus = !currentStatus;

    // Update the task with the new status
    await updateDoc(taskRef, { completed: updatedStatus });

    console.log(`Task status toggled to ${updatedStatus}`);
  } catch (error) {
    console.error("Error toggling task status:", error);
    throw error;
  }
}

// Function to delete task and all its objectives.
export async function deleteTask(taskId) {
  try {
    // Reference to the task document
    const taskDocRef = doc(db, "tasks", taskId);

    // Reference to a subcollection within the task
    const subCollectionRef = collection(taskDocRef, "objectives");
    const q = query(subCollectionRef);

    // Query all documents in the subcollection
    const querySnapshot = await getDocs(q);

    // Delete all documents in the subcollection
    const deleteSubDocsPromises = querySnapshot.docs.map((subDoc) =>
      deleteDoc(doc(db, "tasks", taskId, "objectives", subDoc.id))
    );

    // Wait for all subcollection documents to be deleted
    await Promise.all(deleteSubDocsPromises);

    // After deleting the subcollection documents, delete the task document
    await deleteDoc(taskDocRef);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw new Error("Failed to delete task.");
  }
}
