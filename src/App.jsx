// src/App.jsx
import React from 'react';
import Header from './components/layout/header';
import './App.css';
import LoginPage from './components/pages/LoginPage';

function App() {
  return (
    <div className="App">
      <Header />
      {
      <LoginPage/>

      }

    </div>
  );
}

export default App;
