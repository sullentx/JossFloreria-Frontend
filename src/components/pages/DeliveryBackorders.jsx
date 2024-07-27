import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DeliveryBackorders.css';


const DeliveryBackorders = () => {
  const [backorders, setBackorders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBackorders = async () => {
      try {
        const response = await fetch('/api/backorders'); // URL de tu API
        if (response.ok) {
          const data = await response.json();
          setBackorders(data);
        } else {
          console.error('Error al obtener los pedidos:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener los pedidos:', error);
      }
    };

    fetchBackorders();
  }, []);

  const handleNotificationClick = (orderId) => {
    navigate(`/order-details/${orderId}`);
  };

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
