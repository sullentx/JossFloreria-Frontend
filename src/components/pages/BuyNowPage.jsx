import React, { useEffect, useState } from 'react';
import ProductCard from '../Organisms/ProductCard';
import './BuyNowPage.css';

const BuyNowPage = () => {
  const [product, setProduct] = useState(null);

  useEffect(() => {

    const token = localStorage.getItem('token');
    console.log('Token:', token);

    const fetchProductDetails = async () => {
      if (!token) {
        console.error('No token available. Please log in.');
        return;
      }

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
