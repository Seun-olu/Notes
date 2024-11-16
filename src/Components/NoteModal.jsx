import React, { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

const NoteModal = ({ onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const saveNote = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Both title and content are required.");
      return;
    }
  
    setLoading(true);
    try {
      const newNote = { title, content, createdAt: new Date().toISOString() };
      const docRef = await addDoc(collection(db, "notes"), newNote);
      onSave({ id: docRef.id, ...newNote }); // Pass the note to the parent component
      setTitle("");
      setContent("");
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error adding note:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="fixed inset-0 bg-[#212121] bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#212121] text-[#e8e8e8] p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add Note</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border bg-[#212121] rounded-md mb-4"
          placeholder="Title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border bg-transparent rounded-md h-40"
          placeholder="Write your note here..."
        />
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={saveNote}
            className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
