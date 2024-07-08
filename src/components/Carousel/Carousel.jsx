import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Carousel.css';

import image1 from '../../assets/carousel_imgs/image1.jpg';
import image2 from '../../assets/carousel_imgs/image2.jpg';
import image3 from '../../assets/carousel_imgs/image3.jpg';
import ejm from '../../assets/carousel_imgs/ejm.jpg';


const images = [
    image1,
    image2,
    image3,
    ejm
  ];
  
  const Carousel = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
    };
  
    return (
      <div className="carousel-container">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Slide ${index}`} className="carousel-image" />
            </div>
          ))}
        </Slider>
      </div>
    );
  };
  
  export default Carousel;
