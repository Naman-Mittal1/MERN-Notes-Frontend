import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NoteDetails.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const NoteDetails = ({ selectedNote }) => {
  const [noteDetails, setNoteDetails] = useState(null);

  useEffect(() => {
    // Fetch the details of the selected note from the backend
    if (selectedNote) {
      axios.get(`${API_BASE_URL}/notes/${selectedNote.id}`)
        .then((response) => {
          setNoteDetails(response.data);
        })
        .catch((error) => {
          console.error('Error fetching note details:', error);
        });
    }
  }, [selectedNote]);

  return (
    <div className="note-details">
      {noteDetails ? (
        <div>
          <h2 className="note-details__title">{noteDetails.title}</h2>
          <div className="note-details__content">{noteDetails.content}</div>
          <div className="note-details__category">{noteDetails.category}</div>
          {/* <div className="note-details__category">
            {noteDetails.category ? `Category: ${noteDetails.category}` : 'No Category'}
          </div> */}
        </div>
      ) : (
        <div className="note-details__placeholder">
          <p>Select a note to view details.</p>
        </div>
      )}
    </div>
  );
};

export default NoteDetails;
