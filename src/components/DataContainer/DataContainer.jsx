
import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar'

const DataContainer = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(''); // URL de la API
      const result = await response.json();
      setData(result);
      setFilteredData(result);
    };

    fetchData();
  }, []);

  const handleSearch = (query) => {
    const filtered = data.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <ul>
        {filteredData.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DataContainer