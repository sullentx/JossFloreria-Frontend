
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/button';
import Input from '../Input/input';
import './loginForm.css';
import { useAuth } from '../../context/AuthContext';

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); 

  const created_by = email;
  const update_by = email;
  const deleted = 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/customer/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password, created_by, update_by, deleted }),
      });
console.log(response)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      //localStorage.setItem('token', token);

      //const tokenProvider = localStorage.getItem('token');
      login(data.token); // Guarda el token en el contexto

      onSubmit(data); // Llama a la función de devolución de llamada con los datos
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
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
