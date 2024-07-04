import React from 'react';
import './button.css'
const Button = ({ type, onClick, children }) => {
  return (
    <button className= 'button'
    type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
