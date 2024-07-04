import React from 'react';
import NavBar from './NavBar';
import './index.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <h1>Joss Floreria</h1>
      </div>
      <NavBar />
      <div className="header-icons">
        <i className="fas fa-search"></i>
        <i className="fas fa-heart"></i>
        <i className="fas fa-shopping-cart"></i>
      </div>
    </header>
  );
};

export default Header;
