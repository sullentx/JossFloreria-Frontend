import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import ProductCard from '../Organisms/ProductCard';
import './BuyNowPage.css';

const BuyNowPage = () => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: 'Inicia sesión',
        text: 'Debes iniciar sesión para acceder a esta funcionalidad.',
        showConfirmButton: false,
        timer: 1300,
      }).then(() => {
        window.location.href = '/login';
      });
      return;
    }

    const fetchProductDetails = async () => {
      try {
        const response = await fetch('/api/product', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
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
  }, []);

  return (
    <div className="buy-now-page">
      {product ? (
        <ProductCard product={product} />
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};

export default BuyNowPage;
