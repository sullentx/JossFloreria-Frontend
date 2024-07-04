import React from 'react';
import Header from './components/layout/header';
import './App.css';
import AboutUsSection from './components/organims/AboutUsSection';



import SignInPage from './components/pages/Sign-in';

import Footer from './components/layout/footer';
import Home from './components/pages/Home';


function App() {
  return (
    <div className="App">
      <Header />
   <main>
    <AboutUsSection/>
   </main>
      {

      }
      <Footer />
    </div>
  );
}

export default App;
