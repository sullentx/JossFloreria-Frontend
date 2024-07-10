import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Button from '../Button/button';
import './FavouriteProducts.css';

const FavouriteProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = [
        { id: 1, name: 'Producto Favorito 1', price: 100 },
        { id: 2, name: 'Producto Favorito 2', price: 150 },
      ];
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  const handleRemoveFavourite = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, mantener'
    }).then((result) => {
      if (result.isConfirmed) {
        setProducts(products.filter(product => product.id !== id));
        Swal.fire('Eliminado!', 'El producto ha sido eliminado de favoritos.', 'success');
      }
    });
  };

  const handleOrderAgain = (id) => {
    Swal.fire('Redirigir', 'Redirigir a la vista de pedido', 'success');
  };

  return (
    <div className="favourite-products">
      {products.map(product => (
        <div key={product.id} className="product-item">
          <img src="/src/assets/icons/favourites.png" alt="Favorito" className="favourite-icon" />
          <div className="product-details">
            <p>Nombre: {product.name}</p>
            <p>Precio: ${product.price}</p>
            <div className="product-actions">
              <Button className="button-order-again" onClick={() => handleOrderAgain(product.id)}>Pedir de nuevo</Button>
              <Button className="button-remove-favourite" onClick={() => handleRemoveFavourite(product.id)}>Eliminar de favoritos</Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavouriteProducts;
