"use client";
import { useState } from "react";

const EditView = ({ note, onSaveNote, onClose }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#212121] text-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Note</h2>
        <input
          className="w-full bg-gray-700 text-white p-2 mb-4 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full bg-gray-700 text-white p-2 mb-4 rounded h-32"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              const updatedNote = { id: note.id, title, content };
              onSaveNote(updatedNote); // Save the note
              onClose(); // Close the modal
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditView;
