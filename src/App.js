import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header/Header';
import NoteForm from './components/NoteForm/NoteForm';
import NoteList from './components/NoteList/NoteList';
import SearchBar from './components/SearchBar/SearchBar';
import NoteDetails from './components/NoteDetails/NoteDetails';
import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const App = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [filteredNotes, setFilteredNotes] = useState([]);

  const handleSearch = (searchTerm) => {
    const filtered = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredNotes(filtered);
  };

  const handleNoteSubmit = (newNote) => {
    // Add the new note to the state
    setNotes([newNote, ...notes]);
    setFilteredNotes([newNote, ...notes]); // Update the filtered notes to include the new note
    // Clear the selected note so that the NoteDetails disappear
    setSelectedNote(null);
    // Hide the "Note Created Successfully" popup after 2 seconds
    setTimeout(() => {
      setFilteredNotes([...notes]); // Restore the filtered notes after the popup disappears
    }, 2000);
  };

  const handleNoteDelete = (deletedNoteId) => {
    // Remove the deleted note from the state
    const updatedNotes = notes.filter((note) => note.id !== deletedNoteId);
    setNotes(updatedNotes);
    setFilteredNotes(updatedNotes);
    setSelectedNote(null); // Clear the selected note when it is deleted
  };

  useEffect(() => {
    // Fetch notes data from the backend upon component mount
    axios.get(`${API_BASE_URL}/notes`)
      .then((response) => {
        setNotes(response.data);
        setFilteredNotes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching notes:', error);
      });
  }, []);

  return (
    <div className="app">
      <Header />
      <div className="app__content">
        <div className="app__main">
          <NoteForm onNoteSubmit={handleNoteSubmit} />
          <SearchBar handleSearch={handleSearch} />
          <NoteList notes={filteredNotes} setSelectedNote={setSelectedNote} onDeleteNote={handleNoteDelete} />
        </div>
        <div className="app__details">
          <NoteDetails selectedNote={selectedNote} />
        </div>
      </div>
    </div>
  );
};

export default App;
