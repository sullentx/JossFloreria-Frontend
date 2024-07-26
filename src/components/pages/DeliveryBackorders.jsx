import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DeliveryBackorders.css';

const DeliveryBackorders = () => {
  const navigate = useNavigate();

  const handleNotificationClick = (orderId) => {
    navigate(`/order-details/${orderId}`);
  };

  const backorders = [
    { id: 1, clientName: 'Cliente 1', orderDate: '2024-07-10', deliveryDate: '2024-07-15' },
    { id: 2, clientName: 'Cliente 2', orderDate: '2024-07-11', deliveryDate: '2024-07-16' },
    { id: 3, clientName: 'Cliente 3', orderDate: '2024-07-12', deliveryDate: '2024-07-17' },
  ];

  return (
    <div className="delivery-backorders-container">
      {backorders.map((order) => (
        <div
          key={order.id}
          className="notification-card"
          onClick={() => handleNotificationClick(order.id)}
        >
          <div className="icon-container">
            <img src="/src/assets/icons/alert.png" alt="Urgente" className="urgent-icon" />
          </div>
          <div className="notification-details">
            <p>Nombre del Cliente: {order.clientName}</p>
            <p>Fecha del Pedido: {order.orderDate}</p>
            <p>Fecha de Entrega: {order.deliveryDate}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeliveryBackorders;
