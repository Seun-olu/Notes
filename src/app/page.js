"use client";
import Navbar from "@/Components/Navbar";
import Notes from "@/Components/Notes";
import { useEffect, useState } from "react";

export default function Home( ) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  }, []);

  const saveNotesToLocalStorage = (updatedNotes) => {
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const handleSaveNote = (id, title, content) => {
    const updatedNotes = notes.map((notes) =>
      notes.id === id ? { ...notes, title, content } : notes
    );
    setNotes(updatedNotes);
    saveNotesToLocalStorage(updatedNotes);
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    saveNotesToLocalStorage(updatedNotes);
  };

  const handleAddNote = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      content: "",
      editing: true, // Add this property to indicate the note is being edited
    };
    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    saveNotesToLocalStorage(updatedNotes);
  };
  

  return (
    <div className=" w-full min-h-[100vh] overflow-y-auto bg-[#202124]">
      <Navbar />
      <div className=" ml-16 min-w-[200px] max-w-[800px]  mr-8 flex flex-col justify-center">
        <div
          onClick={handleAddNote}
          className=" max-w-[120px] h-12 text-white items-center border border-[#4f5257] rounded-xl mt-10 mb-5 ml-8 p-2 flex justify-center hover:shadow-lg hover:shadow-black"
        >
          Add a Note
        </div>

        {notes.map((note) => (
          <Notes
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            onSave={handleSaveNote}
            onDelete={handleDeleteNote}
          />
        ))}
      </div>
    </div>
  );
}
