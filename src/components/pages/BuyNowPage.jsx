// BuyNowPage.jsx
import React, { useContext, useEffect, useState } from 'react';
import './BuyNowPage.css';
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const BuyNowPage = () => {
  const { token } = useContext(AuthContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    console.log('Token:', token);
    const fetchProductDetails = async () => {
      try {
        const response = await fetch('/api/product', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const productData = await response.json();
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [token]);

  const handlePurchase = () => {
    Swal.fire({
      title: '¿Confirmar Compra?',
      text: "¿Estás seguro de que quieres comprar este producto?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, comprar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
 
        Swal.fire({
          icon: 'success',
          title: 'Compra Exitosa',
          text: 'El producto ha sido comprado con éxito.',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="buy-now-page">
      {product ? (
        <div className="product-card">
          <img
            src={product.image || '/path/to/your/image.jpg'}
            alt={product.name || 'Producto'}
            className="product-image"
          />
          <div className="product-details">
            <h2 className="product-name">{product.name || 'Nombre del Producto'}</h2>
            <p className="product-price">{product.price ? `$${product.price}` : 'Precio'}</p>
            <p className="product-description">{product.description || 'Descripción del producto'}</p>
            <button className="buy-now-button" onClick={handlePurchase}>
              Comprar Ahora
            </button>
          </div>
        </div>
      ) : (
        <p className="loading-message">Cargando detalles del producto...</p>
      )}
    </div>
  );
};

export default BuyNowPage;
