import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Buscando..."
        className="search-input"
      />
      <Link to={`/buscar?query=${searchTerm}`}>
        <img src="/src/assets/icons/search_N.png" alt="Buscar" className="header-icon" />
      </Link>
    </div>
  );
};

export default SearchBar;
