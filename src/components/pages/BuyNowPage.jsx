import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import ProductCard from '../Organisms/ProductCard';
import './BuyNowPage.css';

const BuyNowPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

    const fetchProducts = async () => {
      const id = 2;
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
    }

    fetchProducts();
  }, []);

  return (
    <div className="buy-now-page">
      {loading ? (
        <p>Cargando productos...</p>
      ) : products.length > 0 ? (
        products.map(product => (
          <div key={product.id} className="product-card">
            <img
              src={product.image_url} // Usa la URL de la imagen obtenida de la API
              alt={product.name}
              className="product-image"
            />
            <ProductCard product={product} />
          </div>
        ))
      ) : (
        <p>No hay productos por confirmar.</p>
      )}
    </div>
  );
};

export default BuyNowPage;
