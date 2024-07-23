import React from 'react';
import NavItem from '../header/NavItem';
import './NavBarAdmin.css'; 

const NavBarAdmin = () => {
  const navItems = [
    { href: '/admin', label: 'Inicio' },
    { href: '/admin/inventario', label: 'Inventario' },
    { href: '/admin/pedidos', label: 'Pedidos Pendientes' },
  ];

  return (
    <ul className="nav-bar-admin">
      {navItems.map((item, index) => (
        <NavItem key={index} href={item.href} label={item.label} />
      ))}
    </ul>
  );
};

export default NavBarAdmin;
