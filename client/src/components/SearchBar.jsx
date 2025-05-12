import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './SearchBar.css';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query) {
      navigate(`/produtos?q=${encodeURIComponent(query)}`);  // Navegando para /produtos com a query
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar..."
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSearch}>
          <FiSearch />
        </button>
        </div>
    </div>
  );
};

export default SearchBar;
