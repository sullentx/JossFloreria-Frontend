
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
      try {
        const response = await fetch('https://ks60rj7q-3000.usw3.devtunnels.ms/api/bouquets?is_precreated=true');
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener los datos de productos',
          text: error.message,
        });
      }
    };

    const fetchFavourites = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No se encontró un token de autenticación.');
        }

        const response = await fetch('https://ks60rj7q-3000.usw3.devtunnels.ms/api/favorites', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(response.status === 403 ? 'Acceso prohibido. Verifica tus credenciales.' : 'Error al obtener favoritos');
        }

        const data = await response.json();
        setFavourites(data.map(fav => fav.bouquet_id));
      } catch (error) {
        console.error('Error al obtener favoritos:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener favoritos',
          text: error.message,
        });
      }
    };

    fetchProducts();
    fetchFavourites();
  }, []);

  const handleAddToFavourites = async (product) => {
    try {
      const formData = new FormData();
      formData.append('bouquet_id', product.id);

      const response = await fetch('https://ks60rj7q-3000.usw3.devtunnels.ms/api/favorites', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (response.ok) {
        setFavourites([...favourites, product.id]);
        Swal.fire({
          icon: 'success',
          title: 'Producto añadido a favoritos',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'No se pudo añadir a favoritos',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error('Error al añadir a favoritos:', error);
      Swal.fire({
        icon: 'error',
        title: 'Ocurrió un problema al añadir a favoritos',
        text: error.message,
      });
    }
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    Swal.fire({
      icon: 'success',
      title: 'Producto añadido al carrito de apartados',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="catalog">
      {products.length === 0 ? (
        <div className="no-products-message">
          Todavía no hay Ramos... Espera nuevos próximamente
        </div>
      ) : (
        products.map((product) => (
          <div key={product.id} className="product-card">
            <img 
              src={product.image_url ? `https://ks60rj7q-3000.usw3.devtunnels.ms/${product.image_url}` : ''} 
              alt={product.name} 
              className="product-image" 
            />
            <div className="product-details">
              <h3>{product.name}</h3>
              <p>Tipo: {product.type_name}</p>
              <p>Detalles: {product.details}</p>
              <p>Precio: ${product.price}</p>
              <p>Cantidad: {product.quantity}</p>
            </div>
            <div className="product-actions">
              <img
                src={favouriteIcon}
                alt="Favorito"
                className={`favourite-icon ${favourites.includes(product.id) ? 'added' : ''}`}
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
        ))
      )}
    </div>
  );
};

export default Catalog;
