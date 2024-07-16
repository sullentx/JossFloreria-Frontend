import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../Carousel/Carousel';
import Button from '../Button/button';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <Carousel />
      <div className="button-container">
        <Link to="/catalog">
          <Button type="button">
            Ver catálogo
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
