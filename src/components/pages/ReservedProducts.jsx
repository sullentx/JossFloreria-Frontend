import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Button from '../Button/button';
import './ReservedProducts.css';

const ReservedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products'); 
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleCancelProduct = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cancelar!',
      cancelButtonText: 'No, mantener'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`/api/products/${id}`, {
            method: 'DELETE',
          });

          if (response.ok) {
            setProducts(products.filter(product => product.id !== id));
            Swal.fire('Cancelado!', 'El producto ha sido cancelado.', 'success');
          } else {
            Swal.fire('Error!', 'Hubo un problema al cancelar el producto.', 'error');
          }
        } catch (error) {
          console.error('Error al cancelar producto:', error);
          Swal.fire('Error!', 'Hubo un problema al cancelar el producto.', 'error');
        }
      }
    });
  };

  const handleBuyProduct = async (id) => {
    try {
      const response = await fetch(`/api/products/${id}/buy`, {
        method: 'POST',
      });

      if (response.ok) {
        Swal.fire('¡Compra realizada!', 'Has comprado el producto.', 'success');
      } else {
        Swal.fire('Error!', 'Hubo un problema al comprar el producto.', 'error');
      }
    } catch (error) {
      console.error('Error al comprar producto:', error);
      Swal.fire('Error!', 'Hubo un problema al comprar el producto.', 'error');
    }
  };

  const handleBuyAll = async () => {
    try {
      const response = await fetch('/api/products/buy', {
        method: 'POST',
        body: JSON.stringify({ products: products.map(product => product.id) }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        Swal.fire('¡Compra realizada!', 'Has comprado todos los productos.', 'success');
      } else {
        Swal.fire('Error!', 'Hubo un problema al comprar los productos.', 'error');
      }
    } catch (error) {
      console.error('Error al comprar todos los productos:', error);
      Swal.fire('Error!', 'Hubo un problema al comprar los productos.', 'error');
    }
  };

  const total = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);

  return (
    <div className="reserved-products">
      {products.map(product => (
        <div key={product.id} className="product-item">
          <img src={product.image} alt={product.name} className="product-image" />
          <div className="product-details">
            <p>Nombre: {product.name}</p>
            <p>Precio: {product.price}</p>
            <p>Cantidad: {product.quantity}</p>
            <Button className="button-cancel" onClick={() => handleCancelProduct(product.id)}>Cancelar apartado</Button>
            <Button className="button-buy" onClick={() => handleBuyProduct(product.id)}>Comprar</Button>
          </div>
        </div>
      ))}
      <div className="total-section">
        <p>Total del carrito: ${total}</p>
        <Button className="button-buy-all" onClick={handleBuyAll}>Comprar</Button>
      </div>
    </div>
  );
};

export default ReservedProducts;
