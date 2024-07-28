import React, { useState } from 'react';
import './SearchPage.css';
import Button from "../Button/button.jsx";

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      alert('Por favor ingresa un término de búsqueda.');
      return;
    }

    setLoading(true);
    setError('');
    setResults([]);

    try {
      const response = await fetch(`https://ks60rj7q-3000.usw3.devtunnels.ms/api/bouquets/search?query=${query}`);
      if (!response.ok) {
        if (response.status === 404) {
          setError('No se encontró el recurso solicitado');
        } else {
          setError('Error desconocido');
        }
      } else {
        const data = await response.json();
        console.log(data); // Verifica la estructura de los datos
        setResults(data.products || []);
      }
    } catch (error) {
      setError('Error desconocido');
    } finally {
      setLoading(false);
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
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p>{error}</p>
        ) : results.length > 0 ? (
          <ul>
            {results.map((product, index) => (
              <li key={index}>
                <div className="product-card">
                  <img src={product.image_url} alt={product.name} className="product-image" />
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>Precio: ${product.price}</p>
                    <Button onClick={() => alert(`Ver detalles de ${product.name}`)}>Ver Más</Button>
                  </div>
                </div>
              </li>
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
