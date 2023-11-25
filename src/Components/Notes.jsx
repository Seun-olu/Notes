"use client";
import { useState } from "react";
import DisplayView from "./DisplayView";
import EditView from "./EditView";

function Notes({ id, title, content, onSave, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);

  const handleSave = () => {
    onSave(id, editedTitle, editedContent);
    setEditing(false);
  };

  return (
    <div className='max-w-[800px] min-h-[150px] max-h-[400px] border border-[#4f5257] rounded-xl mt-10 mb-5 ml-9 p-2 flex justify-center hover:shadow-lg hover:shadow-black transition-all'>
      {editing ? (
        // Use the EditView component for the editing view
        <EditView
          editedTitle={editedTitle}
          setEditedTitle={setEditedTitle}
          editedContent={editedContent}
          setEditedContent={setEditedContent}
          onSave={handleSave}
          setEditing={setEditing}
        />
      ) : (
        // Use the DisplayView component for the non-editing view
        <DisplayView
          title={title}
          id={id}
          content={content}
          onDelete={onDelete}
          setEditing={setEditing}
          editedContent={editedContent}
        />
      )}
    </div>
  );
}

export default Notes;
