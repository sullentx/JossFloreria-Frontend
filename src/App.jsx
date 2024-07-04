// src/App.jsx
import React from 'react';
import Header from './components/layout/header';
import './App.css';
import AboutUsSection from './components/organims/AboutUsSection';
function App() {
  return (
    <div className="App">
      <Header />
   <main>
    <AboutUsSection/>
   </main>
    </div>
  );
}

export default App;
