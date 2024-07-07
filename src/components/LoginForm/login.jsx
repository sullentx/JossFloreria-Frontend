import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/button';
import Input from '../Input/input';
import './loginForm.css';

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form className='login-form' onSubmit={handleSubmit}>
      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit">Login</Button>
      
      <p className="sign-up-prompt">
        ¿No tienes cuenta todavía? <Link to="/sign-in" className="sign-up-link">Create una ahora</Link>
      </p>
    </form>
  );
};

export default LoginForm;
