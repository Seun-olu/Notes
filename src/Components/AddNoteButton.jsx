"use client";
import { useState } from "react";

const AddNoteButton = ({ onSaveNote }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddNote = () => {
    if (title.trim() && content.trim()) {
      onSaveNote({ title, content });
      setTitle("");
      setContent("");
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl"
      >
        +
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-[#212121] text-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Note</h2>
            <input
              className="w-full bg-gray-700 text-white p-2 mb-4 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note Title"
            />
            <textarea
              className="w-full bg-gray-700 text-white p-2 mb-4 rounded h-32"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Note Content"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-500 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNote}
                className="px-4 py-2 bg-blue-500 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddNoteButton;
