import React from 'react';
import NavItem from '../header/NavItem';
import './NavBar.css'; 

const NavBarDeliveryman = () => {
  const navItems = [
    { href: '/delivery-backorders', label: 'Pedidos Pendientes' }, 
  ];
  return (
    <nav className="delivery-header">
      <div className="delivery-header-logo">
        <h1>Joss Florería</h1> {}
      </div>
      <div className="delivery-nav-container">
        <ul className="nav-bar-deliveryman">
          {navItems.map((item, index) => (
            <NavItem key={index} href={item.href} label={item.label} />
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBarDeliveryman;
