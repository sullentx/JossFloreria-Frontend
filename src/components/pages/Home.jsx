import React from 'react';
import Carousel from '../Carousel/Carousel';
import Button from '../Button/button';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <Carousel />
      <div className="button-container">
        <Button type="button" 
        onClick={() => alert('Ver catálogo')}>Ver catálogo</Button>
      </div>
    </div>
  );
};

export default Home;
