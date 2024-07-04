import React from 'react';
import LoginTemplate from '../Template/LoginTemplate';
import './loginPage.css'

const LoginPage = () => {
  const handleLogin = (data) => {
    console.log('Login data:', data);
    // Aquí puedes manejar la lógica del login, como hacer una petición a tu API
  };

  return (
    <div className="login-page">
      <LoginTemplate onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;
