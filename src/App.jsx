import React from 'react';
import Header from './components/layout/header';
import SignInPage from './components/pages/Sign-in';
import Footer from './components/layout/footer';

function App() {
  return (
    <div className="App">
      <Header />
      {
        <SignInPage/>
      }
      <Footer />
    </div>
  );
}

export default App;
