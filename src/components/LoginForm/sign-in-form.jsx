import React, { useState } from 'react';
import Input from '../Input/input';
import Button from '../Button/button';
import './sign-in-form.css';


const SignInForm = ({ onSubmit }) => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

const created_by= email;
const update_by= email;
const deleted = 0;

const handleSubmit = async (e) => {
e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/customer', {
        method: 'POST',
        headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
        },
        body: JSON.stringify({ first_name,last_name,email, password,phone_number,address,created_by,update_by,deleted }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Success:', data);
      onSubmit(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <form className="sign-in-form" onSubmit={handleSubmit}>
      <Input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={first_name}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <Input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={last_name}
        onChange={(e) => setLastName(e.target.value)}
      />
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
      <Input
        type="text"
        name="phoneNumber"
        placeholder="Phone Number"
        value={phone_number}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <Input
        type="text"
        name="address"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <Button type="submit">Sign In</Button>
    </form>
  );
};

export default SignInForm;
