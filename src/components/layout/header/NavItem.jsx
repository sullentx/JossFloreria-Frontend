import React from 'react';
import { Link } from 'react-router-dom';

const NavItem = ({ href, label }) => {
  return (
    <li className="nav-item">
      <Link to={href}>{label}</Link>  {}
    </li>
  );
};

export default NavItem;
