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
      <div className="header-icons" data-animation="diagonal">
        <img src="/src/assets/icons/search_N.png" alt="Buscar" className="header-icon" />
        <img src="/src/assets/icons/login_N.png" alt="Iniciar sesion" className="header-icon" />
        <img src="/src/assets/icons/shopping_cart_N.png" alt="Carrito" className="header-icon" />
      </div>
    </header>
  );
};

export default Header;
