import React from 'react';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import Home from './components/pages/Home';

function App() {
  return (
    <div className="App">
      <Header />
      {
        <Home />
      }
      <Footer />
    </div>
  );
}

export default App;
