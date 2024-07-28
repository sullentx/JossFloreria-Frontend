import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './AdminOrder.css';

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    fetch('https://ks60rj7q-3000.usw3.devtunnels.m/api/orders')
      .then(response => response.json())
      .then(data => setOrders(data));
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    if (newStatus === 'Terminado') {
      Swal.fire({
        icon: 'info',
        title: 'El pedido ya está terminado y no puede cambiar de estado.',
      });
      return;
    }

    Swal.fire({
      title: `¿Estás seguro de que deseas cambiar el estado a "${newStatus}"?`,
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://ks60rj7q-3000.usw3.devtunnels.m/api/orders/${orderId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus }),
        })
          .then(response => response.json())
          .then((updatedOrder) => {
            setOrders(orders.map((order) => (order.id === orderId ? updatedOrder : order)));
            Swal.fire({
              icon: 'success',
              title: `El estado ha cambiado a "${newStatus}".`,
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };

  const statuses = ['En proceso', 'Listo', 'En Camino', 'Terminado'];

  return (
    <div className="admin-order-container">
      <h1 className="admin-order-title">Status de pedidos</h1>
      <div className="admin-order-content">
        {orders.map((order) => (
          <div key={order.id} className="admin-order-details">
            <p>Nombre del Cliente: {order.customerName}</p>
            <p>Precio del pedido: {order.price}</p>
            <p>Fecha elegida: {order.date}</p>
            <p>Dirección del Cliente: {order.address}</p>
            <p>Teléfono del Cliente: {order.phone}</p>
            <p>Estatus: {order.status}</p>
            <div className="admin-status-buttons">
              {statuses.map((item) => (
                <button
                  key={item}
                  className={`admin-status-button ${item.toLowerCase().replace(' ', '-')}`}
                  onClick={() => handleStatusChange(order.id, item)}
                  disabled={order.status === 'Terminado' || order.status === item}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrder;