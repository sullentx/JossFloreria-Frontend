import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './Catalog.css';
import Button from '../Button/button';
import favouriteIcon from '../../assets/icons/favourites.png'; 

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      
      const fetchedProducts = [
        { id: 1, name: 'Producto 1', price: 100, image: '/path/to/image1.jpg' },
        { id: 2, name: 'Producto 2', price: 150, image: '/path/to/image2.jpg' },
     
      ];
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  const handleAddToFavourites = (product) => {
    setFavourites([...favourites, product]);
    Swal.fire({
      icon: 'success',
      title: 'Producto añadido a favoritos',
      showConfirmButton: false,
      timer: 1500
    });
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    Swal.fire({
      icon: 'success',
      title: 'Producto añadido al carrito de apartados',
      showConfirmButton: false,
      timer: 1500
    });
  };

  return (
    <div className="catalog">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} className="product-image" />
          <div className="product-details">
            <h3>{product.name}</h3>
            <p>Precio: {product.price}</p>
          </div>
          <div className="product-actions">
            <img 
              src={favouriteIcon} 
              alt="Favorito" 
              className="favourite-icon" 
              onClick={() => handleAddToFavourites(product)} 
            />
            <Button 
              type="button" 
              className="button-add-to-cart"
              onClick={() => handleAddToCart(product)}
            >
              Agregar al carrito de apartados
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Catalog;
