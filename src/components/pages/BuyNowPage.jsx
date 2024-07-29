import React, { useEffect, useState } from 'react';
import ProductCard from '../Organisms/ProductCard';
import './BuyNowPage.css';

const BuyNowPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const id = 2; 
      const token = localStorage.getItem('token');
      
      try {
        const response = await fetch(`https://ks60rj7q-3000.usw3.devtunnels.ms/api/requests/status/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="buy-now-page">
      {loading ? (
        <p>Cargando productos...</p>
      ) : products.length > 0 ? (
        products.map(product => <ProductCard key={product.id} product={product} />)
      ) : (
        <p>No hay productos por confirmar.</p>
      )}
    </div>
  );
};

export default BuyNowPage;
