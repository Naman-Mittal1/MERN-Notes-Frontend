import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Sidebar.css';

const API_BASE_URL = 'http://localhost:4000/api'; // Update with your backend URL

const Sidebar = ({ handleCategoryChange, handleTagChange }) => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');

  useEffect(() => {
    // Fetch categories from the backend
    axios.get(`${API_BASE_URL}/categories`)
      .then((response) => {
        setCategories(['All', ...response.data]);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });

    // Fetch tags from the backend
    axios.get(`${API_BASE_URL}/tags`)
      .then((response) => {
        setTags(['All', ...response.data]);
      })
      .catch((error) => {
        console.error('Error fetching tags:', error);
      });
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    handleCategoryChange(category);
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    handleTagChange(tag);
  };

  return (
    <div className="sidebar">
      <div className="sidebar__categories">
        <h3 className="sidebar__heading">Categories</h3>
        <ul className="sidebar__list">
          {categories.map((category) => (
            <li
              key={category}
              className={`sidebar__item ${selectedCategory === category ? 'sidebar__item--selected' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar__tags">
        <h3 className="sidebar__heading">Tags</h3>
        <ul className="sidebar__list">
          {tags.map((tag) => (
            <li
              key={tag}
              className={`sidebar__item ${selectedTag === tag ? 'sidebar__item--selected' : ''}`}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
