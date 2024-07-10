import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Button from '../Button/button';
import './ReservedProducts.css';

const ReservedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = [
        { id: 1, name: 'Producto 1', price: 100, quantity: 1, image: '/path/to/image1.jpg' },
        { id: 2, name: 'Producto 2', price: 150, quantity: 1, image: '/path/to/image2.jpg' },
      ];
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  const handleCancelProduct = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cancelar!',
      cancelButtonText: 'No, mantener'
    }).then((result) => {
      if (result.isConfirmed) {
        setProducts(products.filter(product => product.id !== id));
        Swal.fire('Cancelado!', 'El producto ha sido cancelado.', 'success');
      }
    });
  };

  const handleBuyProduct = (id) => {
    Swal.fire('¡Compra realizada!', 'Has comprado el producto.', 'success');
  };

  const handleBuyAll = () => {
    Swal.fire('¡Compra realizada!', 'Has comprado todos los productos.', 'success');
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
