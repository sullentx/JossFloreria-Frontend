
import React, { useState } from 'react';
import './SearchPage.css'; 

const SearchPage = () => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    console.log('Buscando:', query);
  };

  return (
    <div>
      <h1>Buscar Productos</h1>
      <input
        type="text"
        placeholder="Buscar..."
        value={query}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Buscar</button>
      {}
    </div>
  );
};

export default SearchPage;
