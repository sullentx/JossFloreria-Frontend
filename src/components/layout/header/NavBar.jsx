// src/components/layout/header/NavBar.jsx
import React from 'react';
import NavItem from './NavItem';

const NavBar = () => {
  const navItems = [
    { href: '#about', label: 'Acerca de Nosotros' },
    { href: '#shop', label: 'Comprar ahora' },
    { href: '#home', label: 'Inicio' },
    { href: '#catalog', label: 'Catalogo' },
    { href: '#custom', label: 'Arma tu Ramo' }
  ];

  return (
    <ul className="nav-bar">
      {navItems.map((item, index) => (
        <NavItem key={index} href={item.href} label={item.label} />
      ))}
    </ul>
  );
};

export default NavBar;
