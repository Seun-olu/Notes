import { db } from "./firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDocs
} from "firebase/firestore";

const notesCollection = collection(db, "notes");

// Fetch Notes
export const fetchNotes = async () => {
  const snapshot = await getDocs(notesCollection);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt ? data.createdAt.toDate() : null, // Convert Firestore Timestamp to Date object
    };
  });
};

// Add Note
export const addNote = async (note) => {
  const newNote = {
    ...note,
    createdAt: new Date(), // Add createdAt field with the current date
  };
  const docRef = await addDoc(notesCollection, newNote);
  return { id: docRef.id, ...newNote };
};


// Update Note
export const updateNote = async (note) => {
  if (!note.id) throw new Error("Note ID is missing");
  try {
    const docRef = doc(db, "notes", note.id);
    await updateDoc(docRef, {
      title: note.title,
      content: note.content,
    });
  } catch (error) {
    console.error("Error updating note:", error);
    throw error; // Rethrow the error for debugging
  }
};

export const deleteNote = async (id) => {
  try {
    // Assuming you're using Firebase Firestore
    const noteRef = doc(db, "notes", id); // Replace with actual Firestore reference
    await deleteDoc(noteRef); // deleteDoc is from Firestore SDK
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error; // Ensure the error is thrown again to be caught in the calling function
  }
};
