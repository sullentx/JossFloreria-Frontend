
import React from 'react';
import NavItem from './NavItem';

const NavBarAdmin = () => {
  const navItems = [
    { href: 'admin/inventario', label: 'Inventario' },
    { href: 'admin/pedidos', label: 'Pedidos Pendientes' },
    { href: 'admin', label: 'Inicio' },

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

