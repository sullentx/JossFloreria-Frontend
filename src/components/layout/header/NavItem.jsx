// src/components/layout/header/NavItem.jsx
import React from 'react';

const NavItem = ({ href, label }) => {
  return (
    <li className="nav-item">
      <a href={href}>{label}</a>
    </li>
  );
};

export default NavItem;
