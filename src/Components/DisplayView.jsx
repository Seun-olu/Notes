import React, { useState } from "react";
import EditView from "./EditView";

const DisplayView = ({ notes, onNoteClick, onSaveNote }) => {
  const [editingNote, setEditingNote] = useState(null);

  const handleNoteClick = (note) => {
    setEditingNote(note);
  };

  const handleSave = (updatedNote) => {
    onSaveNote(updatedNote); // Call the save function passed as a prop
    setEditingNote(null); // Exit edit mode
  };

  return (
    <div className="p-4">
      {editingNote ? (
        <EditView note={editingNote} onSave={handleSave} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 cursor-pointer">
          {notes.map((note) => (
            <div
              key={note.id}
              onClick={() => handleNoteClick(note)}
              className="p-4 border rounded-2xl cursor-pointer bg-[#212121] hover:bg-gray-100"
            >
              <h3 className="text-lg font-semibold">{note.title}</h3>
              <p className="text-sm text-gray-600">
                {note.content.substring(0, 100)}...
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayView;
