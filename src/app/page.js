"use client"
import { useState, useEffect } from "react";
import { fetchNotes, addNote, updateNote, deleteNote } from "../lib/firestore";
import Sidebar from "../Components/Sidebar";
import AddNoteButton from "../Components/AddNoteButton";
import EditView from "../Components/EditView";

export default function Page() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    noteId: null,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const loadNotes = async () => {
      const fetchedNotes = await fetchNotes();
      setNotes(fetchedNotes);
    };
    loadNotes();
  }, []);

  const handleSaveNote = async (note) => {
    if (note.id) {
      await updateNote(note);
      setNotes((prev) =>
        prev.map((n) => (n.id === note.id ? { ...n, ...note } : n))
      );
    } else {
      const savedNote = await addNote(note);
      setNotes([savedNote, ...notes]);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
    setContextMenu({ visible: false, noteId: null, x: 0, y: 0 });
  };

  const handleRightClick = (event, noteId) => {
    event.preventDefault();
    setContextMenu({
      visible: true,
      noteId,
      x: event.clientX,
      y: event.clientY,
    });
  };

  const closeContextMenu = () => {
    setContextMenu({ visible: false, noteId: null, x: 0, y: 0 });
  };

  useEffect(() => {
    if (contextMenu.visible) {
      document.addEventListener("click", closeContextMenu);
    } else {
      document.removeEventListener("click", closeContextMenu);
    }

    return () => {
      document.removeEventListener("click", closeContextMenu);
    };
  }, [contextMenu.visible]);

  const formatDate = (date) => {
    if (!date) return "";
    
    // Check if the date is a Firestore Timestamp object
    if (date.toDate) {
      date = date.toDate(); // Convert Firestore Timestamp to JavaScript Date
    }
  
    return date.toLocaleDateString(); // Now it's safe to use toLocaleDateString
  };
  

  return (
    <div className="flex h-dvh bg-black text-white">
      <Sidebar />
      <main className="p-8 w-full relative">
        <AddNoteButton onSaveNote={handleSaveNote} />
        {editingNote && (
          <EditView
            note={editingNote}
            onSaveNote={(updatedNote) => {
              console.log("Updating note:", updatedNote);
              updateNote(updatedNote);
            }}
            onClose={() => setEditingNote(null)}
          />
        )}
        <div className="mt-8 grid gap-4">
          {notes.map((note) => (
            <div
              key={note.id}
              onClick={() => setEditingNote(note)}
              onContextMenu={(e) => handleRightClick(e, note.id)}
              className="flex items-center border bg-[#212121] border-[#212121] rounded-2xl w-[80%] p-4 cursor-pointer hover:bg-gray-700"
            >
              <div>
                <h3 className="text-lg font-semibold">{note.title}</h3>
                <p className="text-sm text-gray-400">{formatDate(note.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Context Menu */}
        {contextMenu.visible && (
          <div
            className="absolute bg-gray-800 text-white rounded shadow-lg p-2 z-50"
            style={{ top: contextMenu.y, left: contextMenu.x }}
          >
            <button
              onClick={() => handleDeleteNote(contextMenu.noteId)}
              className="px-4 py-2 w-full text-left hover:bg-gray-700"
            >
              Delete Note
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
