import React, { useState } from 'react';
import axios from 'axios';
import './SearchBar.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const SearchBar = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    // Call the backend API to search for notes based on the search term
    axios.get(`${API_BASE_URL}/notes/search`, { params: { q: searchTerm } })
      .then((response) => {
        handleSearch(response.data);
      })
      .catch((error) => {
        console.error('Error searching for notes:', error);
      });
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={handleChange}
        className="search-bar__input"
      />
      <button onClick={handleSearchClick} className="search-bar__button">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
