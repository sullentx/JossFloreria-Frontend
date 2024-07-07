import React from 'react';
import NavItem from './NavItem';

const NavBar = () => {
  const navItems = [
    { href: '/acerca-de-nosotros', label: 'Acerca de Nosotros' },
    { href: '#shop', label: 'Comprar ahora' }, 
    { href: '/', label: 'Inicio' },
    { href: '/catalogo', label: 'Catálogo' },
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
