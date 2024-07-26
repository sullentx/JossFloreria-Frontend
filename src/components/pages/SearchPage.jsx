import React, { useState } from 'react';
import './SearchPage.css';
import Button from "../Button/button.jsx";

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.example.com/search?query=${query}`);
      const data = await response.json();
      setResults(data.products); // Asumiendo que la respuesta tiene una propiedad "products"
      console.log('Resultados:', data.products);
    } catch (error) {
      console.error('Error al buscar:', error);
    }
  };

  return (
    <div className="search-page">
      <div className="search-container">
        <label htmlFor="search-input">Buscar Productos</label>
        <input
          id="search-input"
          type="text"
          placeholder="Buscar..."
          value={query}
          onChange={handleInputChange}
        />
        <Button onClick={handleSearch}>Buscar</Button>
      </div>
      <div className="results-container">
        {results.length > 0 ? (
          <ul>
            {results.map((product, index) => (
              <li key={index}>{product.name}</li>
            ))}
          </ul>
        ) : (
          <p>No se encontraron productos</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
