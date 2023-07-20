import React, { useState } from 'react';
import axios from 'axios';
import './NoteForm.css';

const API_BASE_URL = 'http://localhost:4000/api';

const NoteForm = ({ onNoteSubmit }) => {
  const [formData, setFormData] = useState({ title: '', content: '', category: '', tags: [] });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send the note data to the backend
    axios.post(`${API_BASE_URL}/notes`, formData)
      .then((response) => {
        onNoteSubmit(response.data);
        setFormData({ title: '', content: '', category: '', tags: [] });
        setShowSuccessPopup(true);
        setTimeout(() => {
          setShowSuccessPopup(false);
        }, 2000); // Display the success popup for 2 seconds
      })
      .catch((error) => {
        console.error('Error submitting note:', error);
      });
  };

  return (
    <div className="note-form">
      {showSuccessPopup && <div className="note-form__success">Note Created Successfully!</div>}
      <h2 className="note-form__title">Create a Note</h2>
      <form className="note-form__form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="note-form__input"
          required
        />
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Write your note here"
          className="note-form__textarea"
          required
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="note-form__input"
          required // Require the category field
        />
        <button type="submit" className="note-form__button">Add Note</button>
      </form>
    </div>
  );
};

export default NoteForm;