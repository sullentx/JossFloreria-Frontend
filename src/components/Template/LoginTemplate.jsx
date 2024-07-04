import React from 'react';
import LoginOrganism from '../Organisms/sign-in-organism';
import './loginTemplate.css'
const LoginTemplate = ({ onSubmit }) => {
  return (
    <div className="login-template">
      <LoginOrganism onSubmit={onSubmit} />
    </div>
  );
};

export default LoginTemplate;
