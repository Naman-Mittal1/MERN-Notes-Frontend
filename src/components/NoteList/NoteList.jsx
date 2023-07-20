import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NoteList.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const NoteList = ({ notes, setSelectedNote }) => {
  const [notesState, setNotesState] = useState(notes);

  useEffect(() => {
    // Update the notesState whenever the notes prop changes
    setNotesState(notes);
  }, [notes]);

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    // Scroll the clicked note to the top
    const selectedNoteElement = document.getElementById(`note-${note.id}`);
    if (selectedNoteElement) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDeleteNote = (noteId) => {
    // Send a delete request to the backend to delete the note
    axios.delete(`${API_BASE_URL}/notes/${noteId}`)
      .then(() => {
        // If the deletion is successful, remove the note from the state
        const updatedNotes = notesState.filter((note) => note.id !== noteId);
        setNotesState(updatedNotes); // Update the state with the new notes array
      })
      .catch((error) => {
        console.error('Error deleting note:', error);
      });
  };
  
  return (
    <div className="note-list">
      {notesState.map((note) => (
        <div key={note.id} id={`note-${note.id}`} className="note" onClick={() => handleNoteClick(note)}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <div className="note__actions">
            <button className='note__delete-btn' onClick={() => handleDeleteNote(note.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
