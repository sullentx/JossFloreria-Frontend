import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './components/layout/footer'; 
import Header from './components/layout/header/index';
import Home from './components/pages/Home';
  const App = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>

  );
};

export default App;
