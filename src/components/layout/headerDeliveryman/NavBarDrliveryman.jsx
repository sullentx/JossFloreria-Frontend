
import React from 'react';
import NavItem from '../header/NavItem';

const NavBarDeliveryman = () => {
  const navItems = [
    { href: 'admin/pedidos', label: 'Pedidos Pendientes' },
    { href: 'admin', label: 'Inicio' },
  ];

  return (
    <ul className="nav-bar-deliveryman">
      {navItems.map((item, index) => (
        <NavItem key={index} href={item.href} label={item.label} />
      ))}
    </ul>
  );
};

export default NavBarDeliveryman;

