import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Button from '../Button/button';
import './FavouriteProducts.css';

const FavouriteProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch('https://ks60rj7q-3000.usw3.devtunnels.ms/api/favorites', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
          },
        });

        if (response.ok) {
          const favorites = await response.json();
          setProducts(favorites);
        } else {
          console.error('Error al obtener favoritos');
        }
      } catch (error) {
        console.error('Error al obtener favoritos:', error);
      }
    };

    fetchFavorites();
  }, []);


  const handleRemoveFavourite = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, mantener',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`/api/favorites/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });

          if (response.ok) {
            setProducts(products.filter((product) => product.id !== id));
            Swal.fire('Eliminado!', 'El producto ha sido eliminado de favoritos.', 'success');
          } else {
            console.error('Error al eliminar el favorito');
          }
        } catch (error) {
          console.error('Error al eliminar el favorito:', error);
        }
      }
    });
  };


  const handleOrderAgain = (id) => {
    Swal.fire('Redirigir', 'Redirigir a la vista de pedido', 'success');

  };

  return (
    <div className="favourite-products">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="product-item">
            <img src="/src/assets/icons/favourites.png" alt="Favorito" className="favourite-icon" />
            <div className="product-details">
              <p>Nombre: {product.name}</p>
              <p>Precio: ${product.price}</p>
              <div className="product-actions">
                <Button className="button-order-again" onClick={() => handleOrderAgain(product.id)}>
                  Pedir de nuevo
                </Button>
                <Button className="button-remove-favourite" onClick={() => handleRemoveFavourite(product.id)}>
                  Eliminar de favoritos
                </Button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No tienes productos favoritos en este momento.</p>
      )}
    </div>
  );
};

export default FavouriteProducts;
