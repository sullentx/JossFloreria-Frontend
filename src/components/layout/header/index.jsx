import React from 'react';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';
import './index.css';
import { Route, useHref } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <h1>Joss Floreria</h1>
      </div>
      <NavBar />
      <div className="header-icons" data-animation="diagonal">
        <img src="/src/assets/icons/search_N.png" alt="Buscar" className="header-icon" />
      <div className="header-icons">

        <Link to="/buscar">
          <img src="/src/assets/icons/search_N.png" alt="Buscar" className="header-icon" />
        </Link>
        <Link to="/login">
          <img src="/src/assets/icons/login_N.png" alt="Iniciar sesion" className="header-icon" />
        </Link>
        <Link to="/carrito">
          <img src="/src/assets/icons/shopping_cart_N.png" alt="Carrito" className="header-icon" />
        </Link>
        <img src="/src/assets/icons/search_N.png" alt="Buscar" className="header-icon"/>
        <img src="/src/assets/icons/login_N.png" alt="Iniciar sesion" className="header-icon" />
        <img src="/src/assets/icons/shopping_cart_N.png" alt="Carrito" className="header-icon" />
      </div>
    </header>
  );
};

export default Header;
